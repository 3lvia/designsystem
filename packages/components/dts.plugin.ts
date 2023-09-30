/* eslint-disable no-console */
import esbuild from 'esbuild';
import ts from 'typescript';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

interface Props {
  destinationDir: string;
}

export const dtsPlugin = (config: Props) =>
  ({
    name: 'dts-plugin',
    async setup(build) {
      const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.esbuild.json', 'utf-8'));
      const compilerOpts = ts.convertCompilerOptionsFromJson(tsConfig.compilerOptions, '').options;
      compilerOpts.declarationDir = config.destinationDir;
      compilerOpts.listEmittedFiles = true;
      const host = ts.createCompilerHost(compilerOpts);
      const files: string[] = [];

      // Register all files that should be transpiled
      build.onResolve({ filter: /(\.tsx|\.ts)$/ }, async (args) => {
        files.push(args.path);

        host.getSourceFile(
          args.path,
          compilerOpts.target ?? ts.ScriptTarget.ES2019,
          (m) => console.log(m),
          true,
        );

        return {};
      });

      // When the build is finished, transpile all typings
      build.onEnd(() => {
        const program = ts.createProgram({
          options: compilerOpts,
          host: host,
          rootNames: files,
        });
        const start = Date.now();
        const emit = program.emit(
          undefined,
          (fileName, text) => {
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
                (_match, fileName) => `../public-api/${fileName}`,
              );
            }

            if (!fs.existsSync(path.dirname(outPath))) {
              fs.mkdirSync(path.dirname(outPath), { recursive: true });
            }
            fs.writeFileSync(outPath, fileContent);
          },
          undefined,
          true,
        );
        console.log(
          chalk.green(
            `⚡️ Built ${emit.emittedFiles ? emit.emittedFiles.length : 0} typings in ${
              Date.now() - start
            }ms`,
          ),
        );
      });
    },
  } as esbuild.Plugin);

export default dtsPlugin;
