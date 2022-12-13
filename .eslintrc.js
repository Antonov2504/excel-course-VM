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
  'rules': {
    'linebreak-style': [
      'error', process.env.NODE_ENV === 'prod' ? 'unix' : 'windows',
    ],
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'object-curly-spacing': ['error', 'always'],
    'require-jsdoc': 0,
    'operator-linebreak': 'off',
    'max-len': ['error', {
      'ignoreComments': true,
      'ignoreTemplateLiterals': true,
    }],
    'indent': ['error', 2],
  },
  'extends': 'google',
};
