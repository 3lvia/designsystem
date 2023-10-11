import esbuild from 'esbuild';
import tinyGlob from 'tiny-glob';
import fs from 'fs/promises';
import path from 'path';
import { toInOutTuple } from './utils';

interface Config {
  name: string;
  attributes: Attribute[];
}

interface Attribute {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'Date' | 'function' | 'event';
}

const shouldIgnoreAttribute = (attr: Attribute) => {
  return attr.type === 'event';
};

const setGetList = (attributes: Attribute[]) => {
  let list = '';
  attributes.forEach((attr) => {
    if (shouldIgnoreAttribute(attr)) {
      return;
    }
    const lowercase = attr.name.toLowerCase();

    list += `
        set ${attr.name}(newValue) {
            super.setProps({'${lowercase}': newValue});
        }
        get ${attr.name}() {
            return super.getProps()['${lowercase}'];
        }
        `;
    // At least 1 uppercase in attr.name
    if (lowercase !== attr.name) {
      list += `
            set ${lowercase}(newValue) {
                super.setProps({'${lowercase}': newValue});
            }
            get ${lowercase}() {
                return super.getProps()['${lowercase}'];
            }
            `;
    }
  });
  return list;
};

const getConfigObject = (file: string): Config => {
  const content = /export.*({[\w\W]*})/.exec(file)?.[1] as string;

  // Remove quotes, new lines and spaces
  const cleanContent = content.replace(/'/g, '').replace(/\n/g, '').replace(/ /g, '');
  const contentWithDoubleQuotes = cleanContent.replace(/([\w.]+)/g, '"$1"');
  const contentWithoutTrailingCommas = contentWithDoubleQuotes.replace(/([\]}]),(?=[\]}])/g, '$1');
  return JSON.parse(contentWithoutTrailingCommas);
};

const createWebComponentPlugin: esbuild.Plugin = {
  name: 'create-webcomponent-plugin',
  async setup(build) {
    const templateFile = await fs.readFile('./build/template/elvia-component.template.js', 'utf-8');

    // Mark all web component imports as external. This makes esbuild ignore them and leave unresolved imports in the bundle
    build.onResolve({ filter: /component-wrapper$|react.js$/ }, (args) => {
      return { path: args.path, external: true };
    });

    build.onLoad({ filter: /\.ts$/ }, async (args) => {
      const cmpName = args.path.split(path.sep).find((str) => str.startsWith('elvis-')) || '';
      const configFile = await fs.readFile(args.path, 'utf-8');
      const config = getConfigObject(configFile);

      const attributeNames = config.attributes
        .filter((attr) => !shouldIgnoreAttribute(attr))
        .map((attr) => attr.name.toLowerCase());

      const fileContent = templateFile
        .replace(/\['{{INSERT_ATTRIBUTES}}'\]/, JSON.stringify(attributeNames))
        .replace(/{{INSERT_COMPONENT_NAME}}/, cmpName.replace('elvis', 'elvia'))
        .replace(/{{INSERT_REACT_NAME}}/, config.name)
        .replace(/\/\/{{INSERT_SETTERS_AND_GETTERS}}/, setGetList(config.attributes))
        .replace(
          /\/\/{{INSERT_COMPONENT_DATA}}/,
          `
              static getComponentData() {
                  return ${JSON.stringify(config)}
              }    
              `,
        );

      return {
        contents: fileContent,
        loader: 'js',
      };
    });
  },
};

const buildWebComponents = async (config: {
  outDir: string;
  watch: boolean;
}): Promise<esbuild.BuildResult | void> => {
  const paths = await tinyGlob('components/elvis-*/src/react/config.ts');

  const baseConfig: esbuild.BuildOptions = {
    entryPoints: paths.map((path) => toInOutTuple(path, 'main', 'web-component')),
    outdir: config.outDir,
    bundle: true,
    format: 'esm',
    plugins: [createWebComponentPlugin],
  };

  if (config.watch) {
    const esBuildContext = await esbuild.context(baseConfig);
    return esBuildContext.watch();
  } else {
    return esbuild.build(baseConfig);
  }
};

export default buildWebComponents;
