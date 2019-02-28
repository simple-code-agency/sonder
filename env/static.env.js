module.exports = {
  watchFiles: [
    'src/**/*.njk'
  ],
  cleanFiles: [
    'public'
  ],
  copyFiles: [
    {
      from: 'src/**/*',
      to: 'public/assets'
    }
  ]
};
