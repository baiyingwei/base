const esprima = require('esprima');
const escodegen = require('escodegen');
const estraverse = require('estraverse');

const sourceCode = 'function ast(){}';
const ast = esprima.parse(sourceCode); //编译成sat树

estraverse.traverse(ast, {
  enter(node){
    if(node.type === 'FunctionDeclaration'){
      node.id.name = 'new' + node.id.name;
    }
  },
  leave(node){
    // console.log(a)
  }
})

let targetCode = escodegen.generate(ast);
console.log(targetCode)