/* eslint-disable no-console */
import ts from 'typescript';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

export const dtsPlugin = ({ destinationDir }) => ({
  name: 'dts-plugin',
  async setup(build) {
    const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.esbuild.json', 'utf-8'));
    const compilerOpts = ts.convertCompilerOptionsFromJson(tsConfig.compilerOptions).options;
    compilerOpts.declarationDir = destinationDir;
    compilerOpts.listEmittedFiles = true;
    const host = ts.createCompilerHost(compilerOpts);
    const files = [];

    // Register all files that should be transpiled
    build.onResolve({ filter: /(\.tsx|\.ts)$/ }, async (args) => {
      files.push(args.path);

      host.getSourceFile(args.path, compilerOpts.target, (m) => console.log(m), true);

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
          `⚡️ Built ${emit.emittedFiles ? emit.emittedFiles.length : 0} typings in ${Date.now() - start}ms`,
        ),
      );
    });
  },
});
