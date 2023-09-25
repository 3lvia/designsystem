import esbuild from 'esbuild';
import tinyGlob from 'tiny-glob';
import fs from 'fs';
import crypto from 'crypto';
import { dtsPlugin } from 'esbuild-plugin-d.ts';

const tmpOutputFolder = 'tmp-public-api-output';

// We create a hash of the new output to see if it differs from the old
// If the file content is the same, we don't move it. This increases performance.
const getMd5 = (fileName) => {
  if (!fs.existsSync(fileName) || fs.statSync(fileName).isDirectory()) {
    return null;
  }

  const hash = crypto.createHash('md5');
  const data = hash.update(fs.readFileSync(fileName), 'utf-8');
  return data.digest('hex');
};

const movePublicApiFiles = {
  name: 'move-public-api-files',
  setup(build) {
    build.onEnd(async () => {
      const paths = await tinyGlob(`${tmpOutputFolder}/**/*.public.{d.ts,js}`);

      paths.forEach((filePath) => {
        const componentFolder = filePath.split('/')[1];
        const isDTs = filePath.endsWith('.d.ts');
        const folderPath = `components/${componentFolder}/dist/public-api`;
        const newPath = `${folderPath}/public-api.${isDTs ? 'd.ts' : 'js'}`;

        if (getMd5(filePath) !== getMd5(newPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
          fs.renameSync(filePath, newPath);
        }
      });

      fs.rmSync(tmpOutputFolder, { force: true, recursive: true });
    });
  },
};

(async () => {
  const watchMode = process.argv.includes('--watch');

  const paths = await tinyGlob('components/elvis-*/src/react/*.public.ts');

  if (watchMode) {
    const esBuildContext = await esbuild.context({
      entryPoints: paths,
      outdir: tmpOutputFolder,
      sourcemap: true,
      logLevel: 'info',
      plugins: [dtsPlugin(), movePublicApiFiles],
    });
    esBuildContext.watch();
  } else {
    esbuild.build({
      entryPoints: paths,
      outdir: tmpOutputFolder,
      logLevel: 'info',
      plugins: [dtsPlugin(), movePublicApiFiles],
    });
  }
})();
