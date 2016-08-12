const webpack = require('webpack');
const path = require('path');
const CarteBlanche = require('carte-blanche');

module.exports = {
  context: path.join(__dirname),
  devtool: 'inline-source-map',
  entry: {
    javascript: './example/app.jsx',
    html: './example/index.html',
  },
  output: {
    filename: './appbundle.js',
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
    new webpack.ProvidePlugin({
      saveAs: 'imports?this=>global!exports?global.saveAs!filesaver.js',
    }),
    new CarteBlanche({ componentRoot: path.join(__dirname, 'src', 'components') }),
  ],
  module: {
    loaders: [
        { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
        { test: /\.js/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
    ],
  },
};
