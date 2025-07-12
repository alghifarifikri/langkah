// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
// };

module.exports = {
  // presets: ['module:@react-native/babel-preset'],
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    `@babel/plugin-transform-export-namespace-from`,
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          src: './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
  ],
};
