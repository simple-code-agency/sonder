module.exports = {
  context: 'src',
  entry: {
    main: [
      './scripts/main.js',
      './styles/main.scss'
    ]
  },
  alias: {
    '@': 'src'
  },
  resolve: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
  env: {
    defaultEnv: 'static',
    root: 'env',
    suffix: '.env',
    localSuffix: '.env.local'
  },
  failOnError: false
};
