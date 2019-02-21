module.exports = {
  'root': true,
  'extends': 'eslint:recommended',
  'globals': {
    'wp': true,
  },
  'env': {
    'node': true,
    'es6': true,
    'amd': true,
    'browser': true,
    'jquery': true,
  },
  'parserOptions': {
    'ecmaFeatures': {
      "generators": true,
      "forOf": true,
      "binaryLiterals": true,
      "classes": true,
      "defaultParams": true,
      "modules": true,
      "templateStrings": true,
      "unicodeCodePointEscapes": true,
      "objectLiteralDuplicateProperties": true,
      "objectLiteralShorthandProperties": true,
      "octalLiterals": true,
      "jsx": true,
      "destructuring": true,
      "objectLiteralComputedProperties": true,
      "arrowFunctions": true,
      "spread": true,
      "globalReturn": true,
      "objectLiteralShorthandMethods": true,
      "regexUFlag": true,
      "superInFunctions": true,
      "blockBindings": true,
      "regexYFlag": true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'import',
  ],
  'settings': {
    'import/core-modules': [],
    'import/ignore': [
      'node_modules',
      'bower_components',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
  'rules': {
    'no-console': 0,
    'quotes': ['error', 'single'],
    'comma-dangle': [
      'error',
      {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'ignore',
      },
    ],
  },
};