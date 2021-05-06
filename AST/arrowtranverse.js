const babel = require('@babel/core');
const type = require('@babel/types');
const template = require('@babel/template');
const { VisitorKeys } = require('estraverse');


const sourceCode = `
  const a = () => {
    console.log(this);
    return 123
  };
`;

const TransformArrow = {
  visitor:{
    ArrowFunctionExpression(nodepath){
      const node = nodepath.node;
      if(node.type === 'ArrowFunctionExpression'){
        const thisBinding = hoistFunctionEnvironment(nodepath);
        node.type = 'FunctionExpression'
      }
    }
  }
}

function hoistFunctionEnvironment(nodepath){
  //获取this对象的节点
  const thisEnvFn = nodepath.findParent(p=> {
    return (p.isFunction() && !p.isArrowFunctionExpression()) || p.isProgram();
  });
  // console.log('thisEnvFn', thisEnvFn)
  //获取作用域
  const thisPaths = getScropeInformation(nodepath);
  if(thisPaths.length){
    console.log(thisEnvFn.scrop)
  }
}

function getScropeInformation(nodepath){
  let thisPaths = [];
  nodepath.traverse({
    ThisExpression(thispath){
      thisPaths.push(thispath)
    }
  })
  return thisPaths;
}

const ast = babel.transform(sourceCode, {
  plugins: [TransformArrow]
})

// console.log(ast.code)