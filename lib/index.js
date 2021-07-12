const path = require('path');
const Compiler = require('./compiler');
const Paser = require('./parser');

// 读取配置文件webpack.config.js
// 获取入口和出口
// 把入口文件解析成ast，获取到依赖modules
// 对每个modules内部转换成es5
// 插入模块
// 输出到文件
 
