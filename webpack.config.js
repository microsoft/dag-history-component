const webpack = require('webpack');
const path = require('path');
const CarteBlanche = require('carte-blanche');

module.exports = {
  context: path.join(__dirname, 'example'),
  devtool: 'inline-source-map',
  entry: {
    javascript: './app.jsx',
    html: './index.html',
  },
  output: {
    filename: 'app.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: path.join(__dirname, 'node_modules'),
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules'),
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CarteBlanche({ componentRoot: path.join(__dirname, 'src') }),
  ],
  module: {
    loaders: [
        { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
        { test: /\.js/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.s(a|c)ss$/, loader: 'style-loader!css-loader!sass-loader' },
    ],
  },
};
