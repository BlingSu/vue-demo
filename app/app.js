const Koa = require('koa')
const body = require('koa-body')
const static = require('koa-static')
const Router = require('./router')
const app = new Koa()
const DEBUG = app.env === 'development'

if (DEBUG) {
  const {
    devMiddleware,
    hotMiddleware
  } = require('koa-webpack-middleware')
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.conf.dev')
  webpackConfig.entry.push(
    'webpack-hot-middleware/client',
    'webpack/hot/dev-server'
  )
}