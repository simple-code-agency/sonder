module.exports = {
  sonder: {
    context: 'src',
    entry: {
      main: [
        './scripts/main.js',
        './styles/main.scss'
      ]
    },
    includeModules: [],
    alias: {},
    resolve: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
    env: {
      defaultEnv: 'static',
      root: 'env',
      suffix: '.env',
      localSuffix: '.env.local'
    },
    failOnError: false
  },
  env: {
    output: {
      filename: 'scripts/[name].js',
      path: 'public/assets',
      publicPath: '/assets/',
      styleFilename: 'styles/[name].css',
      vendorFiles: (path, filename) => `vendor/${path}/${filename}`
    },
    devServer: {
      port: 8000,
      bsPort: 3000,
      base: 'public',
      proxy: false
    },
    copyFiles: [
      {
        from: 'src/**/*',
        to: 'public/assets'
      }
    ],
    cleanFiles: [
      'public/assets'
    ],
    watchFiles: [
      'public/**/*.html'
    ]
  }
};