/**
 * dev环境
 * @param {String} STATIC_DIST 静态资源打包路径 
 * @param {String} HTML_DIST html模板打包路径
 * @param {String} STATIC_PREFIX html内引入资源的前缀
 */
const STATIC_DIST = '/app/dist'
const HTML_DIST = '/app/dist'
const STATIC_PREFIX = '/static/'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const styleLintPlugin = require('stylelint-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

console.log(`development.....`)

module.exports = {
  mode: 'development',
  entry: [
    path.join(process.cwd(), '/src/app.js')
  ],
  output: {
    path: path.join(process.cwd(), STATIC_DIST),
    filename: '[name].js',
    publicPath: STATIC_PREFIX,
    chunkFilename: '[name].js'
  },
  devServer: {
    inline: true,
    contentBase: path.join(process.cwd())
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  devtool: '#module-source-map',
  cache: true,
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new styleLintPlugin({
      configFile: path.join(__dirname, '/.stylelintrc'),
      files: ['src/*.s?(a|c)ss', 'src/!*.vue']
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
    }),
    new HtmlWebpackHarddiskPlugin()
  ],
  module: {
    rules: [
      {
        test: '/\.js$/',
        loader: 'babel-loader',
        include: [
          path.join(process.cwd() + '/src')
        ]
      },
      {
        test: /\.vue$/i,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
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