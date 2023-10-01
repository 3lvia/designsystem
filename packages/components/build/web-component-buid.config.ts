import esbuild from 'esbuild';
import tinyGlob from 'tiny-glob';
import fs from 'fs/promises';
import path from 'path';
import { toInOutTuple } from './utils.ts';

interface Props {
  outDir: string;
  watch: boolean;
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

const createWebComponentPlugin: esbuild.Plugin = {
  name: 'create-webcomponent-plugin',
  async setup(build) {
    const templateFile = await fs.readFile('./build/template/elvia-component.template.js', 'utf-8');

    build.onLoad({ filter: /(\.ts)$/ }, async (args) => {
      const elementName = args.path.split(path.sep)[1];
      const reactName = args.path.split(path.sep)[1];
      const config = await fs.readFile(args.path, 'utf-8');
      const attributes: Attribute[] = Array.from(config.matchAll(/name: ?'(\w+)',\W*type: ?'(\w+)'/g)).map(
        (match) => ({ name: match[1], type: match[2] as Attribute['type'] }),
      );
      const filteredAttributes = attributes.filter((attr) => !shouldIgnoreAttribute(attr));
      const observedAttributes = filteredAttributes.map((attr) => attr.name.toLowerCase());

      const fileContent = templateFile
        .replace(/\['{{INSERT_ATTRIBUTES}}'\]/, JSON.stringify(observedAttributes))
        .replace(/{{INSERT_COMPONENT_NAME}}/, elementName)
        .replace(/{{INSERT_REACT_NAME}}/, reactName)
        .replace(/\/\/{{INSERT_SETTERS_AND_GETTERS}}/, setGetList(attributes))
        .replace(
          /\/\/{{INSERT_COMPONENT_DATA}}/,
          `
              static getComponentData() {
                  return ${JSON.stringify(attributes)}
              }    
              `,
        );

      return {};
    });
  },
};

const buildWebComponents = async (config: Props): Promise<esbuild.BuildResult | void> => {
  const paths = await tinyGlob('components/elvis-badge/src/react/config.ts');

  const baseConfig: esbuild.BuildOptions = {
    entryPoints: paths.map((path) => toInOutTuple(path, 'main', 'web-component')),
    outdir: config.outDir,
    bundle: true,
    format: 'esm',
    plugins: [createWebComponentPlugin],
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
