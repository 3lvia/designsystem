const path = require('path');
const elviaComponents = require('./elvia-components.config.js');
const builds = [];

elviaComponents.forEach((component) => {
  builds.push({
    entry: `./components/${component.name}/dist/web_component/js/${component.elementName}.js`,
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
      path: path.resolve(__dirname, `./components/${component.name}/dist/cdn/`),
    },
    devServer: {
      contentBase: 'dist',
    },
  });
});

builds.push({
  entry: './components/elvis-loader/src/elvia-loader.js',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
  },
  output: {
    filename: `elvia-loader.js`,
    path: path.resolve(__dirname, `./components/elvis-loader/dist/`),
  },
});

module.exports = builds;
