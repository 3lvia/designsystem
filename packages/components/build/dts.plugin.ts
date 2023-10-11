import esbuild from 'esbuild';
import ts from 'typescript';
import path from 'path';
import fsPromises from 'fs/promises';
import fs from 'fs';
import { getMd5 } from './utils';

interface Props {
  destinationDir: string;
  watchMode: boolean;
}

const writeTypingsToDisk = async (fileName: string, text: string, sources?: readonly ts.SourceFile[]) => {
  const originalPath = sources?.[0]?.fileName || '';
  const isPublicApi = path.basename(fileName).includes('.public');
  const outDir = path.dirname(
    originalPath.replace(/src(\/react)?/, `dist${path.sep}${isPublicApi ? 'public-api' : 'react'}`),
  );

  let fileContent = text;
  if (text.match(/\.\/([\w-]+.public)/g)) {
    fileContent = text.replace(
      /\.\/([\w-]+.public)/g,
      (_match, fileName) => `..${path.sep}public-api${path.sep}${fileName}`,
    );
  }

  if (!fs.existsSync(outDir)) {
    await fsPromises.mkdir(outDir, { recursive: true });
  }
  await fsPromises.writeFile(path.join(outDir, path.basename(fileName)), fileContent);
};

const dtsPlugin = (config: Props) =>
  ({
    name: 'dts-plugin',
    async setup(build) {
      const cache = new Map<string, string>();
      const tsConfig: ts.CompilerOptions = {
        listEmittedFiles: true,
        declaration: true,
        emitDeclarationOnly: true,
        incremental: true,
        target: ts.ScriptTarget.ES2015,
        skipLibCheck: true,
        declarationMap: config.watchMode,
      };

      const host = ts.createCompilerHost(tsConfig);
      let files: string[] = [];

      // Register all files that should be transpiled
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
        const emit = program.emit(
          undefined,
          async (fileName, text, _, __, sources) => {
            await writeTypingsToDisk(fileName, text, sources);
          },
          undefined,
          true,
        );

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
