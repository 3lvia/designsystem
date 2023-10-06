import esbuild from 'esbuild';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { getMd5FromFile } from './utils.ts';

const getEntryPointName = (cssPath: string): string => {
  const dir = path.resolve(cssPath, '..', '..', '..', 'package.json');
  const packageJson = fs.readFileSync(dir, 'utf-8');
  const entryPoint = JSON.parse(packageJson).source;
  const outFileName = `${path.basename(entryPoint, '.tsx')}.js`;
  return path.resolve(cssPath, '..', outFileName);
};

const appendInlineStyles = (jsContent: string, cssContent: string): string => {
  const styleId = getMd5FromFile(jsContent);

  const injectionScript = /*ts*/ `const injectCss = () => setTimeout(() => {
    if (!globalThis.document) {
      return;
    }
    const root = globalThis.document;
    const existingStyles = root.getElementById('${styleId}');

    if (!existingStyles) {
      const styleTag = root.createElement('style');
      styleTag.id = '${styleId}';
      
      const nonce = globalThis.window.__webpack_nonce__ || globalThis.window.__elvia_nonce__;
      if (nonce) {
        styleTag.setAttribute('nonce', nonce);
      }

      styleTag.appendChild(root.createTextNode(${JSON.stringify(cssContent)}));
      root.head.appendChild(styleTag);
    }
}, 0);
  
injectCss();`;

  return `${jsContent}\n${injectionScript}`;
};

/**
 * This plugin is used during local development, and ensures
 * that we only write to disk files that have changed. The default
 * behavior of ESBuild is to write everything, which makes HMR of
 * the web page really slow, since a lot of files have changed.
 */
const writePlugin: esbuild.Plugin = {
  name: 'write-plugin',
  async setup(build) {
    const writeCache = new Map<string, string>();

    build.onEnd(async (result) => {
      const output = new Map<string, { text: string; hash: string }>();
      result.outputFiles?.forEach((outputFile) => {
        if (outputFile.path.endsWith('.css')) {
          const entryPointName = getEntryPointName(outputFile.path);
          const entryPointResult = result.outputFiles?.find((file) => file.path === entryPointName);
          if (entryPointResult) {
            const file = appendInlineStyles(entryPointResult?.text, outputFile.text);
            output.set(entryPointResult.path, { text: file, hash: getMd5FromFile(file) || '' });
          }
        } else if (!outputFile.path.endsWith('.css.map')) {
          if (!output.has(outputFile.path)) {
            output.set(outputFile.path, { text: outputFile.text, hash: getMd5FromFile(outputFile.text) });
          }
        }
      });

      writeFilesToDisc(output);
    });

    const writeFilesToDisc = (output: Map<string, { text: string; hash: string }>): void => {
      output.forEach(async (outputFile, filePath) => {
        if (outputFile.hash !== writeCache.get(filePath)) {
          writeCache.set(filePath, outputFile.hash);

          if (!fs.existsSync(filePath)) {
            await fsPromises.mkdir(path.dirname(filePath), { recursive: true });
          }
          await fsPromises.writeFile(filePath, outputFile.text);
        }
      });
    };
  },
};

export default writePlugin;
