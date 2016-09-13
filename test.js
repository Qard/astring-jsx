var acorn = require('acorn-jsx');
var assert = require('assert');
var extend = require('xtend');
var astring = require('./');
var fs = require('fs');

var tap = require('tap');

// Load text and build AST
var text = fs.readFileSync('sample.jsx').toString();
var ast = acorn.parse(text, { plugins: { jsx: true } });

tap.test('supports all JSX features', function (t) {
  t.plan(1);
  var processed = astring(ast, { indent: '  ' });
  t.equal(text, processed, 'original and processed text should be equal');
});

tap.test('supports custom generator', function (t) {
  t.plan(1);
  
  var generator = extend({}, astring.generator, {
    ClassDeclaration: function ClassDeclaration(node, state) {
      t.equal(node.id.name, 'Test', 'should support custom generators');
      astring.generator.ClassDeclaration(node, state);
    }
  });
  
  var processed = astring(ast, {
    generator: generator,
    indent: '  '
  });
});
