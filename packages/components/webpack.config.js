const path = require('path');
const elviaComponents = require('./elvia-components.config.js');
const builds = [];

elviaComponents.forEach((component) => {
  builds.push({
    entry: `./components/${component.name}/src/web_component/${component.name}.ts`,
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
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
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
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
    },
    output: {
      filename: `${component.name}.js`,
      path: path.resolve(__dirname, `./components/${component.name}/dist/cdn/`),
    },
    devServer: {
      contentBase: 'dist',
    },
  });
});

module.exports = builds;
