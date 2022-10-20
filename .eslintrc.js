module.exports = {
  'parser': '@babel/eslint-parser',
  'parserOptions': {
    babelOptions: {
      configFile: './babel.config.json',
      presets: ['@babel/preset-env'],
    },
  },
  'env': {
    browser: true,
    node: true,
    es6: true,
  },
  'extends': 'google',
};
