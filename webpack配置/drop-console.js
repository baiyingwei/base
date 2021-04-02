const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const type = require('@babel/types');
const generator = require('@babel/generator').default;

module.exports = (source) => {
  const ast = parser.parse(source, {
    sourceType: 'module'
  });
  traverse(ast, {
    CallExpression(path) {
      if (type.isMemberExpression(path.node.callee) && type.isIdentifier(path.node.callee.object, { name: "console" })) {
        path.remove()
      }
    }
  })
  const output = generator(ast, {}, source);
  return output.code;
}

