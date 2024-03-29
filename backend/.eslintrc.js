module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    camelcase: 'off',
    noplusplus: 'off',
    'no-plusplus': 'off',
  },
};
