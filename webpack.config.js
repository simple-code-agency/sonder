const path = require('path');

const portfinder = require('portfinder');
const slash = require('slash');
const webpack = require('webpack');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

/**
 * Exclude modules from 'node_modules' and 'bower_components', except the ones
 * provided as argument to this function.
 * @param {Array} keep - Modules to keep included.
 * @returns {RegExp} - Regex used by a loader.
 */
const excludeModules = (keep = []) => new RegExp('(node_modules|bower_components)(?![\\\/](' + keep.join('|') + ')).*');

const devMode = process.env.NODE_ENV !== 'production';

const toConfig = (options = {}) => ({
  context: path.resolve('src'),
  entry: {
    'main': [
      './scripts/main.js',
      './styles/main.scss'
    ]
  },
  output: {
    filename: 'scripts/[name].js',
    path: path.resolve('public/assets'),
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: 'babel-loader',
        exclude: excludeModules()
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: {
              sourceMap: devMode
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: devMode
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: devMode,
              config: {
                ctx: {
                  'postcss-preset-env': {},
                  'autoprefixer': {},
                  'css-mqpacker': {},
                  'cssnano': {
                    discardComments: true
                  }
                }
              }
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: devMode
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: devMode
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|svg|jpe?g|png|gif|ico)$/,
        loader: devMode ? 'file-loader' : 'url-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          limit: 4096,
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|woff2?|svg|jpe?g|png|gif|ico)$/,
        loader: devMode ? 'file-loader' : 'url-loader',
        include: /(node_modules|bower_components)/,
        options: {
          limit: 4096,
          name: '[name].[ext]',
          outputPath: (url, resourcePath) => {
            const regex = /(node_modules|bower_components)[\\\/](.*)[\\\/]/;
            const module = resourcePath.match(regex)[2];
            
            return `vendor/${slash(module)}/${url}`;
          }
        }
      }
    ]
  },
  plugins: [
    ...(devMode ? [
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsPlugin(),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: '4000',
        proxy: `http://localhost:${options.port}/`,
        logLevel: 'silent'
      }, {
        reload: false
      })
    ] : [
      new MiniCssExtractPlugin({
        filename: 'styles/[name].css'
      })
    ]),
    new CopyPlugin([
      {
        from: path.resolve('src/**/*'),
        to: path.resolve('public/assets'),
        ignore: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.css', '*.scss', '*.sass']
      }
    ]),
    new CleanPlugin([
      'public/assets'
    ], {
      root: path.resolve(),
      allowExternal: true
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  resolve: {
    alias: {
      '@': path.resolve('src')
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.tsx']
  },
  devtool: devMode ? 'cheap-module-eval-source-map' : false,
  mode: devMode ? 'development' : 'production',
  stats: {
    colors: true,
    chunks: false,
    modules: false,
    entrypoints: false,
    children: false
  },
  devServer: {
    clientLogLevel: 'none',
    // Used only for static.
    contentBase: path.resolve('public'),
    // proxy: {
    //   '*': {
    //     target: 'http://website.loc',
    //     secure: false,
    //     changeOrigin: true
    //   }
    // },
    port: options.port,
    hot: true,
    noInfo: true,
    overlay: true,
    quiet: true
  }
});

module.exports = () => new Promise((resolve, reject) => {
  if(devMode) {
    portfinder.getPort({ port: 3000 }, (err, port) => err ? reject(err) : resolve(toConfig({ port })));
  } else {
    resolve(toConfig());
  }
});