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
