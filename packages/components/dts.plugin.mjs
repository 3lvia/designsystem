/* eslint-disable no-console */
import ts from 'typescript';
import chalk from 'chalk';
import fs from 'fs';

export const dtsPlugin = () => ({
  name: 'dts-plugin',
  async setup(build) {
    const tsConfig = JSON.parse(fs.readFileSync('./tsconfig.esbuild.json', 'utf-8'));
    const compilerOpts = ts.convertCompilerOptionsFromJson(tsConfig.compilerOptions);
    //   copts.tsBuildInfoFile = resolve(
    //     tmpdir,
    //     require(pjloc).name ?? "unnamed",
    //     ".esbuild",
    //     ".tsbuildinfo",
    // );
    const host = ts.createIncrementalCompilerHost(compilerOpts);
    const files = [];

    // get all ts files
    build.onLoad({ filter: /(\.tsx|\.ts)$/ }, async (args) => {
      files.push(args.path);

      host.getSourceFile(args.path, ts.ScriptTarget.ES2015, (m) => console.log(m), true);

      return {};
    });

    build.onEnd(() => {
      const program = ts.createIncrementalProgram({
        options: compilerOpts,
        host: host,
        rootNames: files,
      });
      const start = Date.now();
      const emit = program.emit();
      console.log(
        chalk.green(
          `⚡️ Built ${emit.emittedFiles ? emit.emittedFiles.length : 0} typings in ${Date.now() - start}ms`,
        ),
      );
    });
  },
});
