const wallabyWebpack = require('wallaby-webpack');
const phantom = require('phantomjs2-ext');

module.exports = function configureWallaby(wallaby) {
  const webpackPostprocessor = wallabyWebpack({
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    module: {
      loaders: [
          { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
          { test: /\.css$/, loader: 'style-loader!css-loader' },
          { test: /\.json$/, loader: 'json-loader' },
          { test: /\.s(a|c)ss$/, loader: 'style-loader!css-loader!sass-loader' },
      ],
    },
  });

  return {
    files: [
      { pattern: 'src/**/*.ts*', load: false },
      { pattern: 'src/**/*.scss*', load: false },
    ],
    tests: [
      { pattern: 'test/**/*.spec.ts*', load: false },
    ],
    compilers: {
      '**/*.js*': wallaby.compilers.typeScript({
        jsx: 'react',
      }),
    },
    postprocessor: webpackPostprocessor,
    bootstrap() {
      window.__moduleBundler.loadTests();
    },
    env: {
      kind: 'electron',
    },
  };
};
