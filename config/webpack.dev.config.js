const resolve = require('./location');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin/lib/index');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: resolve('./src/index.dev.tsx'),
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]',
            }
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: resolve('./tsconfig.json') })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./public/index.html')
    }),
  ],
  devServer: {
    inline: false,
    contentBase: resolve('./src')
  }
};
