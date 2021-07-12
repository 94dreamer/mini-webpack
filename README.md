# 手写一个简单的Webpack
## 一、设计流程
1. 读取配置和入口文件
2. 从入口文件递归分析依赖
3. 运用ast对文件内容进行转换
4. 打包过程触发钩子
5. 生成打包文件IIFE

## 二、组成部分
- Loader
- Plugin

## 三、功能
可以将ES6转换成ES5的语法
可以分析模块之间的依赖关系
生成的JS文件可以再浏览器中运行


参考：
[simple-webpack](./https://gitee.com/geektime-geekbang/geektime-webpack-course/tree/master/code/chapter06/simple-webpack)