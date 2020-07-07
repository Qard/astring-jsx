var astring = require('astring');
var extend = require('xtend');

var generator = Object.assign({
  // <div></div>
  JSXElement: function JSXElement(node, state) {
    var output = state;
    output.write('<');
    this[node.openingElement.type](node.openingElement, state);
    if (node.closingElement) {
      output.write('>');
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        this[child.type](child, state);
      }
      output.write('</');
      this[node.closingElement.type](node.closingElement, state);
      output.write('>');
    } else {
      output.write(' />');
    }
  },
  // <div>
  JSXOpeningElement: function JSXOpeningElement(node, state) {
    var output = state;
    this[node.name.type](node.name, state);
    for (var i = 0; i < node.attributes.length; i++) {
      var attr = node.attributes[i];
      this[attr.type](attr, state);
    }
  },
  // </div>
  JSXClosingElement: function JSXOpeningElement(node, state) {
    var output = state.output;
    this[node.name.type](node.name, state);
  },
  // div
  JSXIdentifier: function JSXOpeningElement(node, state) {
    var output = state;
    output.write(node.name);
  },
  // Member.Expression
  JSXMemberExpression: function JSXMemberExpression(node, state) {
    var output = state;
    this[node.object.type](node.object, state);
    output.write('.');
    this[node.property.type](node.property, state);
  },
  // attr="something"
  JSXAttribute: function JSXAttribute(node, state) {
    var output = state;
    output.write(' ');
    this[node.name.type](node.name, state);

    if(node.value !== null) {
      output.write('=');
      this[node.value.type](node.value, state);
    }
  },

  JSXSpreadAttribute: function JSXSpreadAttribute(node, state) {
    state.write('  {...')
    this[node.argument.type](node.argument, state);
    state.write('}');
  },

  // namespaced:attr="something"
  JSXNamespacedName: function JSXNamespacedName(node, state) {
    var output = state;
    this[node.namespace.type](node.namespace, state);
    output.write(':');
    this[node.name.type](node.name, state);
  },
  // {expression}
  JSXExpressionContainer: function JSXExpressionContainer(node, state) {
    var output = state;
    output.write('{');
    this[node.expression.type](node.expression, state);
    output.write('}');
  },

  JSXEmptyExpression: function JSXEmptyExpression(node, state) {

  },

  // text
  JSXText: function JSXExpressionContainer(node, state) {
    var output = state;
    output.write(node.value);
  },
}, astring.baseGenerator);

function astringJsx (ast, options) {
  return astring(ast, extend({
    generator: generator
  }, options));
}

astringJsx.generator = generator;
module.exports = astringJsx;

module.exports.JsxGenerator = generator; 
