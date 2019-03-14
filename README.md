# Vue后台管理系统模板

> 技术栈 Vue + Vuex + Webpack + Svg + Sass + Koa2

## 使用说明

``` bash
# 克隆项目
git clone git@github.com:angelasubi/vue-demo.git

# 安装依赖
yarn

# 本地dev环境运行
npm run dev

# 本地prd环境运行
npm run start

# 打包
npm run release
```


## 为什么要写这个东西
* 理由一: 我从来都不喜欢用脚手架
* 理由二: 自定义的东西有更好的扩展性


## 如何搭建
1. 先看看目录结构
```
|--------------------------------------------------
|---/app  //  koa server 
|---|---/dist  //  打包的静态资源文件夹
|---|---/app.js  //  koa入口
|---|---/router.js  //  koa-router配置
|---/node_modules  //  npm依赖
|---/src  //  主目录，会被打包到/app/dist
|---|---/api  //  公共API
|---|---/assets  //  公共资源
|---|---|---/images  //  公共图片
|---|---|---/fonts  //  公共字体文件
|---|---/common  //  公共方法
|---|---|---/components  //  公共vue组件
|---|---|---/mixins  //  公共mixins
|---|---|---/plugin  //  公共自定义vue插件
|---|---|---/utils  //  公共js方法
|---|---/router  //  前端路由
|---|---/styles  //  scss样式
|---|---/views  //  页面的模块
|---|---/app.js  //  前端入口
|---|---/index.html  //  模板html, 将会被打包到/app/dist
|---.babelrc  //  babel配置
|---.gitignore  //  git配置
|---.stylelintrc  //  stylelint配置
|---package.json  //  npm配置
|---README.md  //  项目介绍
|---webpack.conf.dev.js  //  webpack开发环境配置
|---webpack.conf.pro.js  //  webpack生产环境配置
|--------------------------------------------------

