module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '~',
        rootPathSuffix: 'src',
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
  env: {
    production: {
      plugins: [
        [
          'babel-plugin-root-import',
          {
            rootPathPrefix: '~',
            rootPathSuffix: 'src',
          },
        ],
      ],
    },
  },
};
