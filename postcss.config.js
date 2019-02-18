module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-preset-env': options['postcss-preset-env'] ? options['postcss-preset-env'] : false,
    'autoprefixer': options['autoprefixer'] ? options['autoprefixer'] : false,
    'css-mqpacker': options['css-mqpacker'] ? options['css-mqpacker'] : false,
    'cssnano': env === 'production' ? options['cssnano'] ? options['cssnano'] : false : false
  }
});