import esbuild from 'esbuild';
import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';

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
      result.outputFiles?.forEach(async (outputFile) => {
        if (outputFile.hash !== writeCache.get(outputFile.path)) {
          writeCache.set(outputFile.path, outputFile.hash);

          if (!fs.existsSync(outputFile.path)) {
            await fsPromises.mkdir(path.dirname(outputFile.path), { recursive: true });
          }
          await fsPromises.writeFile(outputFile.path, outputFile.contents);
        }
      });
    });
  },
};

export default writePlugin;
