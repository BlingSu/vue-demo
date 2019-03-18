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
1. 先来简单的介绍一下目录结构，然后我们再来挨个详细的介绍！
首先，在根目录下有2个文件（app和src）和一堆配置文件，app为打包的输出点，src为源码。

2. 先说说根目录下的配置文件是干啥的
* .balelrc 配置一些东西来达成不用浏览器支持就可以编译成需要的代码 [可以看这里](https://github.com/babel/babel)
* .gitignore 防止提交 node_modules 或者 dist 之类的一些不需要提交的文件
* .styleintrc 一些css规则 [可以看这里](https://stylelint.io/user-guide/rules)

3. src目录下主要包括分为如下几个目录
 - api 公共api调用的接口
 - assets 静态资源目录(就是一些图片，字体，还有svg图片，当然这个svg)
 - common 公共文件目录(components组件、mixins、plugin、utils等)  
   这个`plugin/index.js`引入了svg组件和fetch方法挂载在Vue原型上，当然可以在扩张一些filter、components、fn等
 - router 路由文件
 - store 全局状态管理，也就是Vuex 
 - styles 样式文件，包括mixins、normalize、variables、layout、tool、rest以及框架自带的修改文件
 - views 页面，可以根据功能区分，这里只加了一个layout

 4. 重点来说说webpack