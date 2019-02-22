module.exports = {
  context: 'src',
  entry: {
    main: [
      './scripts/main.js',
      './styles/main.scss'
    ]
  },
  views: 'src/views',
  alias: {
    '@': 'src'
  },
  resolve: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
  env: {
    defaultEnv: 'static'
  },
  failOnError: false
};
