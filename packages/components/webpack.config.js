const path = require('path');
const elviaComponents = require('./elvia-components.config.js');
const builds = [];

elviaComponents.forEach((component) => {
  const elementName = 'elvia' + component.reactName.replace(/([A-Z])/g, '-$1').toLowerCase();
  const packageName = elementName.replace('elvia', 'elvis');
  builds.push({
    entry: `./components/${packageName}/dist/web_component/js/${elementName}.js`,
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
      filename: `${elementName}.js`,
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
