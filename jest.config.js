module.exports = {
  preset: 'react-native',
  collectCoverage: true,
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/jest.setup.js'
  ],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.svg': '<rootDir>/__mocks__/svgMock.js'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native'
    + '|react-navigation-tabs'
    + '|react-native-snap-carousel'
    + '|react-native-splash-screen'
    + '|react-native-screens'
    + '|react-native-gesture-handler'
    + '|react-native-iphone-x-helper'
    + '|react-native-material-dropdown-v2'
    + '|react-native-material-ripple'
    + '|react-native-material-buttons'
    + '|react-native-vector-icons'
    + '|react-native-config'
    + '|rn-fetch-blob'
    + '|react-native-safe-area-view'
    + '|react-native-reanimated'
    + '|react-native-snap-carousel'
    + '|react-native-community/netinfo'
    + ')/)',
  ],
  moduleDirectories: [
    'node_modules',
    'src/utils',
    __dirname
  ]
};
