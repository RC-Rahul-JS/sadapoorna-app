// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
// // const { withNativeWind } = require('nativewind/metro');

// const defaultConfig = getDefaultConfig(__dirname);

// const config = {};

// module.exports = withNativeWind(
//   mergeConfig(defaultConfig, config),
//   { input: './global.css' }
// );

// const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
// const { withNativeWind } = require("nativewind/metro");
 
// const config = mergeConfig(getDefaultConfig(__dirname), {
//   /* your config */
// });
 
// module.exports = withNativeWind(config, { input: "./global.css" });
const { getDefaultConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

module.exports = withNativeWind(getDefaultConfig(__dirname), {
  input: './global.css',
});