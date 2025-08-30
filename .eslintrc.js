module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['prettier'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/scripts/*.js'] },
    ],
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-await-in-loop': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-underscore-dangle': 'off',
    'prettier/prettier': 'error',
  },
};
