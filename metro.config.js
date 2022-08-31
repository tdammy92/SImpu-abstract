/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

require('dotenv').config();
const MetroConfig = require('@ui-kitten/metro-config');
const defaultConfig = require('metro-config/src/defaults').getDefaultValues();
const evaConfig = {
  evaPackage: '@eva-design/eva',
};

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },

  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: process.env.RN_SRC_EXT
      ? [
          ...process.env.RN_SRC_EXT.split(','),
          ...defaultConfig.resolver.sourceExts,
          'svg',
        ]
      : [...defaultConfig.resolver.sourceExts, 'svg'],
  },
  maxWorkers: 2,
};
