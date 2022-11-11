const path = require('path');
const elviaComponents = require('./elvia-components.config.js');
const builds = [];

elviaComponents.forEach((component) => {
  const packageName = component.elementName.replace('elvia', 'elvis');
  builds.push({
    entry: `./components/${packageName}/dist/web_component/js/${component.elementName}.js`,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
          ],
        },
      ],
    },
    externals: {
      react: 'react',
      'react-dom': 'reactDOM',
      classnames: 'classnames',
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
    },
    output: {
      filename: `${component.elementName}.js`,
      path: path.resolve(__dirname, `./components/${packageName}/dist/cdn/`),
    },
    devServer: {
      contentBase: 'dist',
    },
    performance: {
      maxAssetSize: 1100000,
      maxEntrypointSize: 1100000,
    },
  });
});

module.exports = builds;
