module.exports = {
  watchFiles: [
    'src/**/*.njk'
  ],
  cleanFiles: [
    'public/assets'
  ],
  copyFiles: [
    {
      from: 'src/**/*',
      to: 'public/assets',
      ignore: ['*.njk']
    }
  ]
};
