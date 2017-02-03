const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const CSS_LOADERS = ['style-loader', 'css-loader', 'postcss-loader'];
const NODE_MODULES = path.join(__dirname, 'node_modules');

module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname),
  entry: {
    javascript: './example/app.tsx',
  },
  output: './dist/appbundle.js',
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    modulesDirectories: [NODE_MODULES],
    fallback: NODE_MODULES,
    alias: {
      'react/lib/ReactMount': 'react-dom/lib/ReactMount',
      sinon: 'sinon/pkg/sinon',
    },
  },
  resolveLoader: {
    modulesDirectories: [NODE_MODULES],
    fallback: NODE_MODULES,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'DAG History Component Example',
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      saveAs: 'imports?this=>global!exports?global.saveAs!filesaver.js',
    }),
  ],
  module: {
    loaders: [
        { test: /\.css$/, loaders: CSS_LOADERS },
        { test: /\.scss$/, loaders: [...CSS_LOADERS, 'sass-loader'] },
        { test: /\.ts(x|)/, loaders: ['ts-loader'], exclude: /node_modules/ },
    ],
  },
};
