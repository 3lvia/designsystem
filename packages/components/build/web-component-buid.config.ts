import esbuild from 'esbuild';
import tinyGlob from 'tiny-glob';
import fs from 'fs';
import path from 'path';
import { toInOutTuple } from './utils.ts';

interface Props {
  outDir: string;
  watch: boolean;
}

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
  const content = file.match(/export.*({[\w\W]*})/)?.[1] as string;

  // Remove quotes, new lines and spaces
  const cleanContent = content.replace(/'/g, '').replace(/\n/g, '').replace(/ /g, '');
  const contentWithDoubleQuotes = cleanContent.replace(/([\w\.]+)/g, '"$1"');
  const contentWithoutTrailingCommas = contentWithDoubleQuotes.replace(/],?}/g, ']}').replace(/},?]/g, '}]');
  return JSON.parse(contentWithoutTrailingCommas);
};

const createWebComponentPlugin = (rootDir: string) => {
  return {
    name: 'create-webcomponent-plugin',
    async setup(build) {
      const templateFile = fs.readFileSync('./build/template/elvia-component.template.js', 'utf-8');

      build.onLoad({ filter: /(\.ts)$/, namespace: 'to-text' }, async (args) => {
        const cmpName = args.path.split(path.sep).find((str) => str.startsWith('elvis-')) || '';
        const reactName = cmpName
          .split('-')
          .slice(1)
          .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
          .join('');
        const configFile = fs.readFileSync(args.path, 'utf-8');
        const config = getConfigObject(configFile);

        const attributeNames = config.attributes
          .filter((attr) => !shouldIgnoreAttribute(attr))
          .map((attr) => attr.name.toLowerCase());

        const fileContent = templateFile
          .replace(/\['{{INSERT_ATTRIBUTES}}'\]/, JSON.stringify(attributeNames))
          .replace(/{{INSERT_COMPONENT_NAME}}/, cmpName.replace('elvis', 'elvia'))
          .replace(/{{INSERT_REACT_NAME}}/, reactName)
          .replace(/\/\/{{INSERT_SETTERS_AND_GETTERS}}/, setGetList(config.attributes))
          .replace(
            /\/\/{{INSERT_COMPONENT_DATA}}/,
            `
              static getComponentData() {
                  return ${JSON.stringify(config)}
              }    
              `,
          );

        // const outDir = path.join(rootDir, cmpName, 'dist', 'main');
        // if (!fs.existsSync(outDir)) {
        //   fs.mkdirSync(rootDir);
        // }
        // fs.writeFileSync(path.join(rootDir, 'web-component.js'), fileContent);

        return {
          contents: fileContent,
          loader: 'ts',
        };
      });
    },
  } as esbuild.Plugin;
};

const buildWebComponents = async (config: Props): Promise<esbuild.BuildResult | void> => {
  const paths = await tinyGlob('components/elvis-accordion/src/react/config.ts');

  const baseConfig: esbuild.BuildOptions = {
    entryPoints: paths.map((path) => toInOutTuple(path, 'main', 'web-component')),
    outdir: config.outDir,
    bundle: true,
    format: 'esm',
    plugins: [createWebComponentPlugin(config.outDir)],
  };

  if (config.watch) {
    const esBuildContext = await esbuild.context({
      ...baseConfig,
      sourcemap: true,
    });
    return esBuildContext.watch();
  } else {
    return esbuild.build({ ...baseConfig, minify: false });
  }
};

export default buildWebComponents;
