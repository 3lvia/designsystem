import esbuild from 'esbuild';
import fs from 'fs/promises';
import path from 'path';
import { optimize } from 'svgo';

const makePascalCase = (kebabCase: string) => {
  const clearAndUpper = (text: string) => {
    return text.replace(/-/, '').toUpperCase();
  };
  return kebabCase.replace(/(^\w|-\w)/g, clearAndUpper);
};

const createIllustrationsPlugin: esbuild.Plugin = {
  name: 'create-illustrations-plugin',
  async setup(build) {
    const templateFile = await fs.readFile('./build/illustration.template.js', 'utf-8');

    const minifiedStyle = (
      await esbuild.build({ entryPoints: ['build/colors.css'], bundle: true, write: false, minify: true })
    ).outputFiles[0].text;

    build.onLoad({ filter: /\.svg$/ }, async (args) => {
      const illustrationName = path.parse(
        args.path.split(path.sep).find((str) => str.endsWith('.svg')) || '',
      ).name;

      const svgString = await fs.readFile(args.path, 'utf8');
      const optimizedSvg = optimize(svgString).data;

      const fileContent = templateFile
        .replace(/{{INSERT_SVG}}/, optimizedSvg)
        .replace(/{{INSERT_STYLE}}/, minifiedStyle)
        .replace(/{{INSERT_COMPONENT_NAME}}/, `elvis-illustrations-${illustrationName}`)
        .replace(/INSERT_ILLUSTRATION_CLASS_NAME/g, `ElvisIllustration${makePascalCase(illustrationName)}`);

      return {
        contents: fileContent,
        loader: 'js',
      };
    });
  },
};

const generateIllustrations = async (config: {
  outDir: string;
  watch: boolean;
}): Promise<esbuild.BuildResult | void> => {
  const baseConfig: esbuild.BuildOptions = {
    entryPoints: ['src/illustrations/*.svg'],
    outdir: config.outDir,
    loader: { '.svg': 'text' },
    format: 'esm',
    plugins: [createIllustrationsPlugin],
  };

  if (config.watch) {
    const esBuildContext = await esbuild.context(baseConfig);
    return esBuildContext.watch();
  } else {
    return esbuild.build(baseConfig);
  }
};

export default generateIllustrations;
