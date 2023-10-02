import esbuild from 'esbuild';
import ts from 'typescript';
import path from 'path';
import fsPromises from 'fs/promises';
import fs from 'fs';

interface Props {
  destinationDir: string;
  log: boolean;
}

const dtsPlugin = (config: Props) =>
  ({
    name: 'dts-plugin',
    async setup(build) {
      const tsConfig: ts.CompilerOptions = {
        declarationDir: config.destinationDir,
        listEmittedFiles: true,
        declaration: true,
        emitDeclarationOnly: true,
        incremental: true,
        target: ts.ScriptTarget.ES2015,
        skipLibCheck: true,
      };

      const host = ts.createCompilerHost(tsConfig);
      const files: string[] = [];

      // Register all files that should be transpiled
      build.onResolve({ filter: /(\.tsx|\.ts)$/ }, async (args) => {
        files.push(args.path);

        host.getSourceFile(
          args.path,
          tsConfig.target ?? ts.ScriptTarget.ES2019,
          (m) => console.error(m),
          true,
        );

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
          async (fileName, text) => {
            const isPublicApi = path.basename(fileName).includes('.public');
            const normalizedPath = fileName.replace('react/', '');
            const outPath = normalizedPath.replace(
              'src',
              `dist${path.sep}${isPublicApi ? 'public-api' : 'react'}`,
            );

            let fileContent = text;
            if (text.match(/\.\/([\w-]+.public)/g)) {
              fileContent = text.replace(
                /\.\/([\w-]+.public)/g,
                (_match, fileName) => `..${path.sep}public-api${path.sep}${fileName}`,
              );
            }

            if (!fs.existsSync(path.dirname(outPath))) {
              await fsPromises.mkdir(path.dirname(outPath), { recursive: true });
            }
            await fsPromises.writeFile(outPath, fileContent);
          },
          undefined,
          true,
        );

        if (config.log) {
          console.log(
            `✏️  Wrote ${emit.emittedFiles ? emit.emittedFiles.length : 0} typings in ${
              Date.now() - start
            }ms`,
          );
        }
      });
    },
  } as esbuild.Plugin);

export default dtsPlugin;
