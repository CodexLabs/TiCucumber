'use strict';

var ticucumber = require('../lib/ticucumber.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit


  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['test'] = {
  'should indentify a palindrome': function(test) {
    test.ok(ticucumber.test('was it a car or a cat I saw?'));
    test.done();
  },
  'should indentify a non-palindrome': function(test) {
    test.ok(!ticucumber.test('this is not a palindrode'));
    test.done();
  },
  'should return false for non-string values': function(test) {
    test.ok(!ticucumber.test(23));
    test.done();
  },
  'should return false for empty or null values': function(test) {
    test.ok(!ticucumber.test(null) || (!ticucumber.test()));
    test.done();
  }
};
