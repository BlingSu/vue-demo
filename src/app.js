import 'core-js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import plugin from './common/plugin/index'
import App from './views/app'
import routes from './router/index'
import './styles/index.scss'
/**
 * @desc: 引入ui框架
 */

if (process.env.NODE_ENV !== 'production') {
  Vue.config.devtools = true
}

/**
 * 使用
 */
Vue.use(VueRouter)
Vue.use(plugin)

const router = new VueRouter({
  mode: 'history',
  routes
})

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})