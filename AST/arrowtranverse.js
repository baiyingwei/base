const core = require('@babel/core');
const types = require('@babel/types');
const sourceCode = `
  const a = () => {
    return 1;
  }
`;

//每个插件有自己的访问器, 对象里右节点，属性就是对象的类型
const BabelPluginArrowTranverse = {
  visitor: {
    ArrowFunctionExpression(nodepath){
      let node = nodepath.node;
      if(node.type === 'ArrowFunctionExpression'){
        node.type = 'FunctionExpression';
      }
    }
  }
}

let targetCode = core.transform(sourceCode, {
  plugins: [BabelPluginArrowTranverse]
}).code;

console.log(targetCode)