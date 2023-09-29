/* eslint-disable no-console */
import ts from 'typescript';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

export const dtsPlugin = ({ destinationDir, paths }) => ({
  name: 'dts-plugin',
  async setup(build) {
    const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.esbuild.json', 'utf-8'));
    const compilerOpts = ts.convertCompilerOptionsFromJson(tsConfig.compilerOptions).options;
    compilerOpts.declarationDir = destinationDir;
    compilerOpts.listEmittedFiles = true;
    const host = ts.createCompilerHost(compilerOpts);
    const files = [];
    const f = paths.map((p) => p.in);

    // get all ts files
    build.onResolve({ filter: /(\.tsx|\.ts)$/ }, async (args) => {
      files.push(args.path);

      host.getSourceFile(args.path, compilerOpts.target, (m) => console.log(m), true);

      return {};
    });

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
          const componentName = fileName.split('/')[1];

          const isPublic = path.basename(fileName).includes('.public');

          if (isPublic) {
            fs.writeFileSync(
              path.join(destinationDir, componentName, 'dist', 'public-api', 'public-api.d.ts'),
              text,
            );
          } else {
            fs.writeFileSync(
              path.join(destinationDir, componentName, 'dist', 'react', path.basename(fileName)),
              text,
            );
          }
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
