(function(modules){
    var installModules={}
    function __webpack_require__(moduleId){
        if(installModules[moduleId])return installModules[moduleId];

        const __webpack_exports__= {} 
        modules[moduleId](__webpack_require__,__webpack_exports__); 
        
        return installModules[moduleId] = __webpack_exports__;
    }
    return __webpack_require__('./src/index.js');
}({
    './src/index.js':function(require,exports){
        // 内容
        eval('"use strict";\n\nvar _a = require("./src/a.js");\n\n(0, _a.count)(1, 2);')
    },
    './src/a.js':function(require,exports){
        eval('"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.count = void 0;\n\nvar count = function count(a, b) {\n  var sum = a + b;\n  console.log(sum);\n};\n\nexports.count = count;')
    }
}))