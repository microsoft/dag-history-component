const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname),
  devtool: 'inline-source-map',
  entry: {
    javascript: './example/app.tsx',
    html: './example/index.html',
  },
  output: {
    filename: './appbundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    modulesDirectories: [path.join(__dirname, 'node_modules')],
    fallback: path.join(__dirname, 'node_modules'),
    alias: {
      'react/lib/ReactMount': 'react-dom/lib/ReactMount',
      sinon: 'sinon/pkg/sinon',
    },
  },
  resolveLoader: {
    modulesDirectories: [path.join(__dirname, 'node_modules')],
    fallback: path.join(__dirname, 'node_modules'),
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      saveAs: 'imports?this=>global!exports?global.saveAs!filesaver.js',
    }),
  ],
  module: {
    loaders: [
        { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
        { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
        { test: /\.scss$/, loader: 'style-loader!css-loader!postcss-loader!sass-loader' },
        { test: /\.ts(x|)/, loaders: ['ts-loader'], exclude: /node_modules/ },
    ],
  },
};
