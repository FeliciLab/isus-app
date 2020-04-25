module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    'func-names': 'off',
    'no-param-reassign': 'off',
    'react/jsx-indent': 'off',
  },
  globals: {
    fetch: false,
    window: true,
  },
};
