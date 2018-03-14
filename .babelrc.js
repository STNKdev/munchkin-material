module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    'lodash',
    'version-inline',
  ],
  env: {
    development: {
      plugins: [
        'react-hot-loader/babel',
        [
          'react-intl',
          {
            messagesDir: './messages/',
          },
        ],
      ],
    },
    production: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements',
        [
          '@babel/plugin-transform-runtime',
          {
            polyfill: false,
          },
        ],
        ['react-remove-properties', { properties: ['data-screenshots'] }],
        'transform-react-remove-prop-types',
      ],
    },
    test: {
      plugins: ['dynamic-import-node'],
    },
  },
};
