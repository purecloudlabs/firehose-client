const Path = require('path');

module.exports = (env = {}) => {
  let babelLoader;
  let entry = './dist/npm/module.js';
  let filename = 'streaming-client.browser.js';

  if (env.ie) {
    console.log('Building for IE compatibility');
    filename = 'streaming-client.browser.ie.js';

    entry = [
      './node_modules/unorm/lib/unorm.js',
      './node_modules/whatwg-fetch/fetch.js',
      './dist/npm/module.js'
    ];

    babelLoader = {
      test: /\.(cjs|mjs|js)$/,
      loader: 'babel-loader',
      exclude: [
        /@babel\//,
        /\bcore-js\b/,
        /\bwebpack\/buildin\b/
      ],
      options: {
        sourceType: 'unambiguous',
        plugins: [
          ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
          ['@babel/plugin-proposal-class-properties'],
          ['@babel/transform-runtime']
        ],
        presets: [
          ['@babel/preset-env', {
            corejs: { version: 3 },
            useBuiltIns: 'usage',
            targets: [
              'last 2 versions',
              '> 5%',
              'IE 11',
              'not dead'
            ]
          }]
        ]
      }
    };
  }

  return {
    entry,

    output: {
      filename,
      library: 'GenesysCloudStreamingClient',
      libraryTarget: 'window',
      libraryExport: 'default',
      path: Path.resolve('dist')
    },

    module: {
      rules: [
        babelLoader || {}
      ]
    }
  };
};
