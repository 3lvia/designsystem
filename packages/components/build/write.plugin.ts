import esbuild from 'esbuild';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { getComponentName, getMd5FromFile } from './utils';

interface FileWithHash {
  hash: string;
  text: string;
}

const getEntryPointName = (cssPath: string): string => {
  const packageJsonPath = path.resolve(cssPath, '..', '..', '..', 'package.json');
  const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
  const entryPoint = JSON.parse(packageJson).source;
  const outFileName = `${path.basename(entryPoint, '.tsx')}.js`;
  return path.resolve(cssPath, '..', outFileName);
};

const appendInlineStyles = (outputFile: esbuild.OutputFile, cssContent: string): string => {
  const id = `${getComponentName(outputFile.path)}-component`;

  const injectionScript = /*ts*/ `const injectCss = () => setTimeout(() => {
  if (!globalThis.document) {
    return;
  }

  const existingStyles = globalThis.document.getElementById('${id}');
  const styleContent = globalThis.document.createTextNode(${JSON.stringify(cssContent)});

  if (!existingStyles) {
    const styleTag = globalThis.document.createElement('style');
    styleTag.id = '${id}';
    
    const nonce = globalThis.window.__webpack_nonce__ || globalThis.window.__elvia_nonce__;
    if (nonce) {
      styleTag.setAttribute('nonce', nonce);
    }

    styleTag.appendChild(styleContent);
    globalThis.document.head.appendChild(styleTag);
  } else {
    existingStyles.replaceChildren(styleContent);
  }
}, 0);

injectCss();`;

  return `${outputFile.text}\n${injectionScript}`;
};

/**
 * By default, ESBuild compiles and writes all files it watches. This
 * makes the HMR on local development slow, since Angular needs to reload
 * all components. Therefore, we implement the write logic ourselves by
 * only writing the files that have changed.
 */
const writePlugin: esbuild.Plugin = {
  name: 'write-plugin',
  async setup(build) {
    const writeCache = new Map<string, string>();

    build.onEnd(async (result) => {
      const output = getFilesToWriteWithInjectedCSS(result);
      writeFilesToDisc(output);
    });

    const getFilesToWriteWithInjectedCSS = (result: esbuild.BuildResult): Map<string, FileWithHash> => {
      const output = new Map<string, FileWithHash>();
      result.outputFiles?.forEach((outputFile) => {
        if (outputFile.path.endsWith('.css')) {
          const entryPointName = getEntryPointName(outputFile.path);
          const entryPointResult = result.outputFiles?.find((file) => file.path === entryPointName);
          if (entryPointResult) {
            const file = appendInlineStyles(entryPointResult, outputFile.text);
            output.set(entryPointResult.path, { text: file, hash: getMd5FromFile(file) || '' });
          }
        } else if (!outputFile.path.endsWith('.css.map')) {
          if (!output.has(outputFile.path)) {
            output.set(outputFile.path, { text: outputFile.text, hash: getMd5FromFile(outputFile.text) });
          }
        }
      });

      return output;
    };

    const writeFilesToDisc = async (output: Map<string, FileWithHash>): Promise<void> => {
      for (const [filePath, file] of output) {
        if (file.hash !== writeCache.get(filePath)) {
          writeCache.set(filePath, file.hash);

          if (!fs.existsSync(filePath)) {
            await fsPromises.mkdir(path.dirname(filePath), { recursive: true });
          }
          await fsPromises.writeFile(filePath, file.text);
        }
      }
    };
  },
};

export default writePlugin;
