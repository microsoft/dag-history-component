const webpack = require('webpack');
const path = require('path');
const SassLintPlugin = require('sasslint-webpack-plugin');
const CarteBlanche = require('carte-blanche');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    path.join(__dirname, './src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['app/bower_components', 'node_modules'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new SassLintPlugin({
      glob: 'scripts/**/*.s(a|c)ss',
    }),
    new CarteBlanche({
      componentRoot: './src',
    }),
  ],
  module: {
    preLoaders: [
      {
        test: /app\/.*\.js(x|)?$/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
        { test: /\.js/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
        { test: /\.css$/, loader: 'style!css' },
        { test: /\.s(a|c)ss$/, loader: 'style!css!sass' },
    ],
  },
};
