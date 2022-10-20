const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;

  const getFileName = (ext) =>
    isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;
  const getPlugins = () => {
    const basePlugins = [
      new HtmlWebpackPlugin({
        template: './index.html',
        scriptLoading: 'blocking',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'favicon.ico'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: getFileName('css'),
      }),
    ];

    if (isDev) {
      basePlugins.push([new ESLintPlugin()]);
    }
  };

  return {
    target: 'web',
    context: path.resolve(__dirname, 'src'),
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      watchFiles: './',
    },
    devtool: isDev ? 'source-map' : false,
    entry: {
      main: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        './index.js',
      ],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: getFileName('js'),
      clean: true,
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      },
    },
    plugins: getPlugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
