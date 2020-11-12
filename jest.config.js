module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native'
    + '|react-navigation-tabs'
    + '|react-native-splash-screen'
    + '|react-native-screens'
    + '|react-native-vector-icons'
    + '|react-native-config'
    + '|rn-fetch-blob'
    + '|react-native-safe-area-view'
    + '|react-native-reanimated'
    + ')/)',
  ],
  moduleDirectories: [
    'node_modules',
    'src/utils',
    __dirname
  ]
};
