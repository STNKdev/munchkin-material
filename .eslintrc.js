module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:lodash-fp/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  env: {
    browser: true,
  },
  globals: {
    VERSION: true,
  },
  plugins: ['json'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'prettier/prettier': 'error',
    'react/forbid-prop-types': [
      'error',
      {
        forbid: ['match'],
      },
    ],
    'react/jsx-sort-default-props': 'error',
    'react/jsx-sort-props': 'error',
    'react/prop-types': [
      'error',
      {
        ignore: ['classes', 'className', 'style', 'theme'],
      },
    ],
    'react/sort-prop-types': 'error',
  },
  overrides: [
    {
      files: ['scripts/**/*.js'],
      env: {
        node: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
