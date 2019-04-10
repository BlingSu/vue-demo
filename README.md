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
> 分为两个文件 webpack.conf.dev.js 和 webpack.conf.prd.js，对应为开发环境和生产环境的构建

#### 先看看`webpack.conf.dev.js`里面做了什么  
首先定义三个打包地址的常量  
 - `STATIC_DIST` 静态资源打包路径 `/app/dist`
 - `HTML_DIST` HTML模板打包路径 `/app/dist`
 - `STATIC_PREFIX` HTML内引入资源的前缀 `/static/`

然后就是引入一些需要的node_modules，在这里用到了如下几个包  
[`path` 一个处理文件路径和目录路径的包](http://nodejs.cn/api/path.html)  
[`webpack` 模块打包工具](https://webpack.js.org/)  
[`html-webpack-plugin` 生成一个HTML文件](https://github.com/jantimon/html-webpack-plugin)  
[`html-webpack-harddisk-plugin` 上面的扩展，在HRM的时候特别方便](https://github.com/jantimon/html-webpack-harddisk-plugin)  
[`stylelint-webpack-plugin` 代码校验](https://github.com/webpack-contrib/stylelint-webpack-plugin)  
[`vue-loader` 不用多说了...](https://github.com/vuejs/vue-loader)  

在配置的时候那么需要一个简单的模块大致如下
```js
module.exports = {
  entry: [],
  output: {},
  devServer: {},
  resolve: {},
  plugins: [],
  module: {}
}
```
`entry` 打包入口，在这里我们指向的是`/src/app.js`，如果多个入口可以写成数组形式  
`output` 编译完成打包的输出点，path为输出的绝对路径，filename为输出的名字，publicPath为资源前缀，chunkFilename为非入口chunk文件的名称  
`devServer` 本地服务，inline启动内联模式 contentBase 从哪个目录中提取内容  
`resolve` 解析，在这里自动解析的扩展为就放了js和vue  
`plugins` 插件，这里用了VueLoaderPlugin来解析，HotModuleReplacementPlugin用来模块热替换，styleLintPlugin来校验一写规范，最后通过HtmlWebpackPlugin来创建html，包含生成的路径名字，源模板来源，favicon，其中inject为不注入所有assets，minify控制输出方式，alwaysWriteToDisk为自动引用资源  
`module` 处理一些必须的模块，包括babel，vue-loader，scss，css，svg，img之类的，可以在基础上继续扩展  

> 然后因为是dev模式，所以需要开mode为development,cache打开，devtool设置为module-source-map方便开发的时候定位问题所在


#### 再来看`webpack.conf.prd.js`里面做了什么  
稍微看一下，感觉和`webpack.conf.dev.js`美什么差别！！！  
但是仔细看一下好像多了点东西，`CleanPlugin, MiniCssExtractPlugin, UglifyJsPlugin, OPtimizeCSSAssetsPlugin`这几个模块  
因为是构建环境，就是打包要发布到服务器上，所以必须做一些优化处理  
- mode模式为production
- output中filename和chunkFilename采用hash
- devtool不开启
- cache不开启
- 新增optimization，也是在prd环境中最重要的一点，其实也就是优化最明显的地方。在这里我把optimization中分为3个点来考虑: `runtimeChunk`, `minimizer`, `splitChunks`。第一个`runtimeChunk`用于为 runtime chunks 命名，这里设置为mainfest，第二个`minimizer`中采用UglifyJsPlugin压缩js，配置为使用缓存，采用多进程提高构建速度,映射源错误、然后用OptimizeCSSAssetsPlugin压缩样式图片等。第三个`splitChunks`动态导入模块，配置为chunks为异步的时候进行优化，minSize最小为30000字节，minChunks分割前必须共享的模块最小为1，maxAsyncRequests按需加载时候最大并行加载为5，maxInitialRequests入口最大并行请求为3个，name在prd环境下通常为false这样才不会在不必要的时候修改名称,然后是cacheGroups缓存，这里是结合HtmlWebpackPlugin使用的，分为vendor和styles，其中styles中enforce表示忽略splitChunks.minSize，splitChunks.minChunks，splitChunks.maxAsyncRequests，splitChunks.maxInitialRequests选项，并始终为此缓存组创建块。
- 每次构建的之前用CleanPlugin清理静态资源
- 新增DefinePlugin在编译的时候设置process.env为prd
- 通过HashedModuleIdsPlugin生成四位数的hash作为模块id
- MiniCssExtractPlugin把css提取到单独的css文件中，在webpack4中支持按需加载
- 最后在HtmlWebpackPlugin中加入minify

> iterm中采用cross-env，详情可以[点这里](https://github.com/kentcdodds/cross-env)

以上就是生产环境下的webpack配置，和开发环境是类似的，只是在基础上添加了许多在打包时候需要考虑和优化的东西，既然这么多相似的地方，那么可以创建一个`webpack.conf.base.js`来放相同的配置，分别在dev和prd中引入，这样能够更加直观明了。大概就是这样，非常简单其实没什么看看文档根据自己的需求配置扩展就行了。

#### 然后来说说是怎么写出这个vue-demo的
首先需要建几个必备文件，然后在慢慢扩展
```bash
mkdir vue-demo
cd vue-demo
npm init
mkdir src  # 作为开发用的目录
mkdir app # 打包后放东西的目录
```