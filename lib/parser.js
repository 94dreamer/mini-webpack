const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;    // 需要 babel-plugin-add-module-exports
const {transformFromAstSync} =require('@babel/core');
const fs = require('fs');

module.exports={
    getAST:(filename)=>{
        const content = fs.readFileSync(filename,'utf-8');
        
        return parser.parse(content, {
            sourceType:'module',
        })
    },
    getDependencis:(ast)=>{
        const dependencis=[];
        traverse(ast,{
            ImportDeclaration:(path)=>{
                dependencis.push(path.node.source.value)
            }
        })
        return dependencis
    },
    transform:(ast)=>{
        // 把es6转换成es5
        const result = transformFromAstSync(ast,null,{
            presets: ["@babel/preset-env"]
        });

        return result.code;
    }
}