// 读取配置文件webpack.config.js
// 获取入口和出口
// 把入口文件解析成ast，获取到依赖modules
// 对每个modules内部转换成es5
// 插入模块
// 输出到文件
const fs = require('fs');
const path = require('path');
const traverse = require('@babel/traverse').default;    // 需要 babel-plugin-add-module-exports
const parser = require('./parser'); 

module.exports = class Compiler{
    constructor({entry,output}){
        this.cwdPath=process.cwd()
        this.entry = path.join(this.cwdPath,entry);
        this.output= path.join(output.path,output.filename) 
        this.modules = new Map();
    }

    run(){
        // 递归查找依赖
        this.buildModule(this.entry);
        this.emitFiles();
    }

    buildModule(filename){
        if(this.modules.has(filename))return false;
        const dirname = path.dirname(filename);

        // 转换模块为es5塞进modules
        const ast = parser.getAST(filename);
        // 更改引用路径
        traverse(ast,{
            ImportDeclaration:(path)=>{
                path.node.source.value = require('path').join( dirname, path.node.source.value)
            }
        })

        const code = parser.transform(ast);
        this.modules.set(filename,code);

        // 分析依赖，递归
        parser.getDependencis(ast).forEach(depFileName=>{
            this.buildModule(depFileName)
        })
    }
    emitModule(key,value){
        return `
        '${key}':function(require,module,exports){
            ${value}
        }
        `
    }
    emitFiles(){
        const mContent=[...this.modules.entries()].map((m)=>{
            return this.emitModule(...m)
        }).join(',');

        const temp = `
            (function(modules){
                var installModules={}
                function __webpack_require__(moduleId){
                    if(installModules[moduleId])return installModules[moduleId];

                    const module= {
                        exports : {},
                    };
                    modules[moduleId](__webpack_require__,module,module.exports); 
                    
                    installModules[moduleId] = module;
                    return module.exports;
                }
                return __webpack_require__("${this.entry}");
            })({
                ${mContent}
            })
        `
        fs.writeFileSync(this.output,temp);
        console.log('mini-webpack 打包完成！')
    }
};