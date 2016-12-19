//  enable runtime transpilation to use ES6/7 in node

const config = {
  presets: ['es2015', 'stage-0'],
  plugins: [
    'transform-runtime',
    'add-module-exports',
    'transform-decorators-legacy',
    'transform-react-display-name',
    'syntax-async-functions',
    'transform-regenerator',
    'transform-async-to-generator',
    'transform-class-properties'
  ],
  env: {
    development: {
      plugins: [
        'typecheck'
      ]
    }
  }
};

require('babel-register')(config);
