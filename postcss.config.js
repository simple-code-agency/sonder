module.exports = ({ env, options }) => ({
  plugins: {
    'postcss-preset-env': options['postcss-preset-env'] ? options['postcss-preset-env'] : false,
    'autoprefixer': options['autoprefixer'] ? options['autoprefixer'] : false,
    'cssnano': env === 'production' ? options['cssnano'] ? options['cssnano'] : false : false
  }
});