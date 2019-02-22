const path = require('path');
const nunjucks = require('nunjucks');
const portfinder = require('portfinder');
const slash = require('slash');
const webpack = require('webpack');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const resolveEnv = require('./util/resolveEnv');
const excludeModules = require('./util/excludeModules');
const merge = require('./util/merge');

const defaultConfig = require('./config');

const generateConfig = ({ devMode, sonder, env, port = undefined }) => ({
  context: path.resolve(sonder.context),
  entry: sonder.entry,
  output: {
    filename: env.output.filename,
    path: path.resolve(env.output.path),
    publicPath: env.output.publicPath
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              failOnWarning: false,
              failOnError: true
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.m?js$/,
        use: 'babel-loader',
        exclude: excludeModules(sonder.includeModules)
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
        test: /\.(ttf|eot|woff2?|svg|jpe?g|png|gif|ico|webp|mp4|mp3)$/,
        loader: devMode ? 'file-loader' : 'url-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          limit: 4096,
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|woff2?|svg|jpe?g|png|gif|ico|webp|mp4|mp3)$/,
        loader: devMode ? 'file-loader' : 'url-loader',
        include: /(node_modules|bower_components)/,
        options: {
          limit: 4096,
          name: '[name].[ext]',
          outputPath: (url, resourcePath) => {
            const regex = /(node_modules|bower_components)[\\\/](.*)[\\\/]/;
            const modulePath = resourcePath.match(regex)[2];
            
            return env.output.vendorFiles(slash(modulePath), url);
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
        port: env.devServer.bsPort,
        proxy: `http://localhost:${port}/`,
        logLevel: 'silent',
        files: env.watchFiles.map(file => path.resolve(file))
      }, {
        reload: false
      })
    ] : [
      new MiniCssExtractPlugin({
        filename: env.output.styleFilename
      })
    ]),
    new webpack.ProvidePlugin(sonder.globals),
    new StyleLintPlugin({
      failOnError: !devMode,
      syntax: 'scss',
    }),
    new CleanPlugin(env.cleanFiles, {
      root: path.resolve(),
      allowExternal: true
    }),
    new CopyPlugin(env.copyFiles.map(file => ({
      from: path.resolve(file.from),
      to: path.resolve(file.to)
    })), {
      ignore: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.css', '*.scss', '*.sass']
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  resolve: {
    alias: (() => {
      Object.keys(sonder.alias).map(key => sonder.alias[key] = path.resolve(sonder.alias[key]));
      
      return sonder.alias;
    })()
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
    ...(env.devServer.proxy ? {
      proxy: {
        '*': {
          target: env.devServer.proxy,
          secure: false,
          changeOrigin: true
        }
      }
    } : {
      contentBase: false
    }),
    setup: app => {
      nunjucks.configure('src/views', {
        express: app,
        autoescape: true,
        watch: true
      });
  
      app.set('view engine', 'njk');
      
      // It's a file if it has an extension.
      const fileRegex = /\.(.*)$/;
      
      app.get('*', (req, res, next) => {
        let url = req.originalUrl;
        const isFile = fileRegex.test(url);
        
        if(!isFile) {
          url = url[url.length - 1] === '/' ? url.substr(1) + 'index' : url;
          res.render(url);
        } else {
          next();
        }
      });
    },
    clientLogLevel: 'none',
    port: port,
    hot: true,
    noInfo: true,
    overlay: true,
    quiet: true
  }
});

module.exports = (envName) => new Promise((resolve, reject) => {
  let sonderUser = null;
  
  try {
    sonderUser = require(path.resolve('sonder.config'));
  } catch(err) {
    sonderUser = {};
  }
  
  const sonder = merge(defaultConfig.sonder, sonderUser);
  
  const envUser = resolveEnv(envName, sonder.env, sonder.failOnError);
  const env = merge(defaultConfig.env, envUser);
  
  const devMode = process.env.NODE_ENV !== 'production';
  
  if(devMode) {
    portfinder.getPort({ port: env.devServer.port }, (err, port) => err ? reject(err) : resolve(generateConfig({ devMode, sonder, env, port })));
  } else {
    resolve(generateConfig({ devMode, sonder, env, undefined }));
  }
});