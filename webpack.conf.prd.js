/**
 * prd环境
 * @param {String} STATIC_DIST 静态资源打包路径 
 * @param {String} HTML_DIST html模板打包路径
 * @param {String} STATIC_PREFIX html内引入资源的前缀
 */
const STATIC_DIST = '/app/dist/static'
const HTML_DIST = '/app/dist'
const STATIC_PREFIX = '/static/'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const styleLintPlugin = require('stylelint-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

console.log(`production....`)

module.exports = {
  mode: 'production',
  entry: [
    path.join(process.cwd(), '/src/app.js')
  ],
  output: {
    path: path.join(process.cwd(), STATIC_DIST),
    filename: '[name].[hash:8].js',
    publicPath: STATIC_PREFIX,
    chunkFilename: '[name].[chunkhash:6].js'
  },
  devtool: false,
  cache: false,
  resolve: {
    extensions: ['.js', '.vue']
  },
  optimization: {
    runtimeChunk: {
      name: 'mainfest'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanPlugin(path.join(process.cwd(), STATIC_DIST)),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new styleLintPlugin({
      configFile: path.join(process.cwd(), '/.stylelintrc'),
      files: ['src/*.s?(a|c)ss', 'src/!*.vue']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[hash:6].css'
    }),
    new HtmlWebpackPlugin({
      filename: path.join(process.cwd(), HTML_DIST, '/index.html'),
      template: path.join(process.cwd(), '/src/index.html'),
      favicon: path.join(process.cwd(), '/src/assets/images/favicon-32x32.png'),
      inject: false,
      minify: {
        caseSensitive: true,
        collapseWhitespace: true
      },
      alwaysWriteToDisk: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          optimizeSSR: false
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        include: [path.join(process.cwd() + '/src/assets/images/svg')],
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        exclude: path.join(process.cwd() + '/src/assets/images/svg'),
        options: {
          limit: '10000',
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|woff|svg|eot|ttf)\??.*$/i,
        loader: 'url-loader',
        exclude: path.join(process.cwd() + '/src/assets/images'),
        options: {
          limit: '50000',
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  }
}