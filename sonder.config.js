module.exports = {
  context: 'src',
  entry: {
    main: [
      './scripts/main.js',
      './styles/main.scss'
    ]
  },
  views: {
    root: 'src/views',
    ext: 'njk'
  },
  alias: {
    '@': 'src'
  },
  resolve: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
  env: {
    defaultEnv: 'static'
  },
  failOnError: false
};
