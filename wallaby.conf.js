var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

  var webpackPostprocessor = wallabyWebpack({
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    module: {
      loaders: [
          { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
          // { test: /\.js/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
          { test: /\.css$/, loader: 'style-loader!css-loader' },
          { test: /\.s(a|c)ss$/, loader: 'style-loader!css-loader!sass-loader' },
      ],
    },
  });

  return {
    files: [
      { pattern: 'src/**/*.js*', load: false },
      { pattern: 'src/**/*.spec.js*', load: false, ignore: true }
    ],
    tests: [
      { pattern: 'src/**/*.spec.js*', load: false }
    ],
    compilers: {
      '**/*.js*': wallaby.compilers.babel()
    },
    postprocessor: webpackPostprocessor,
    bootstrap: function () {
      window.__moduleBundler.loadTests();
    },
    env: {
      runner: require('phantomjs2-ext').path,
      params: { runner: '--web-security=false' }
    }
  };
};
