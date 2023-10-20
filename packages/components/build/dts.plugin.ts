import esbuild from 'esbuild';
import ts from 'typescript';
import path from 'path';
import { getMd5 } from './utils';

interface Props {
  watchMode: boolean;
}

// Fix imports of types from .public.ts to resolve from ../public-api folder.
// We need to do this since we manually write the files to other locations than the default.
// This and writeTypingsToDisc can be removed if we figure out how to define a more granular
// outPath for our types.
const resolveImportsOfPublicApi = (text: string): string => {
  return text.replace(
    /\.\/([\w-]+.public)/g,
    (_match, fileName) => `..${path.sep}public-api${path.sep}${fileName}`,
  );
};

const writeTypingsToDisk = (fileName: string, text: string, outDir: string) => {
  const fileContent = resolveImportsOfPublicApi(text);
  const isPublicApi = path.basename(fileName).includes('.public');
  const dir = path.resolve(fileName.replace(outDir, 'components'));
  const outPath = dir.replace('src', 'dist').replace('react', `${isPublicApi ? 'public-api' : 'react'}`);
  ts.sys.writeFile(outPath, fileContent);
};

const dtsPlugin = (config: Props) =>
  ({
    name: 'dts-plugin',
    async setup(build) {
      /**
       * The out dir name does not matter. The important part is that we build
       * our types in a folder, even though we resolve a custom build path in
       * writeTypingsToDisk. The reason for this, is that it is used by the
       * TypeScript compiler to calculate the relative path to sources when we
       * generate declaration maps during development.
       */
      const outDir = 'tmp_folder';

      const cache = new Map<string, string>();
      const tsConfig: ts.CompilerOptions = {
        declarationDir: outDir,
        strict: true,
        listEmittedFiles: true,
        declaration: true,
        emitDeclarationOnly: true,
        skipLibCheck: true,
        jsx: ts.JsxEmit.React,
        declarationMap: config.watchMode,
        rootDir: 'components',
      };

      const host = ts.createCompilerHost(tsConfig);
      let files: string[] = [];

      /**
       * Register all files that should be transpiled. We compare
       * old and new file content with an MD5 hash to only compile
       * types for files that have actually changed.
       **/
      build.onResolve({ filter: /(\.tsx|\.ts)$/ }, async (args) => {
        const newHash = getMd5(args.path);
        if (newHash && newHash !== cache.get(args.path)) {
          cache.set(args.path, newHash);
          files.push(args.path);
        }

        return {};
      });

      // When the build is finished, transpile all typings
      build.onEnd(() => {
        const program = ts.createProgram({
          options: tsConfig,
          host: host,
          rootNames: files,
        });
        const start = Date.now();
        const emit = program.emit(undefined, (fileName, text) => writeTypingsToDisk(fileName, text, outDir));

        // Clear the files list for next build
        files = [];
        if (!config.watchMode) {
          console.log(
            `✏️  Wrote ${emit.emittedFiles ? emit.emittedFiles.length : 0} typings in ${
              Date.now() - start
            }ms`,
          );
        }
      });
    },
  }) as esbuild.Plugin;

export default dtsPlugin;
