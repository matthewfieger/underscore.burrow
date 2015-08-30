var _ = require('./underscore');
var burrow = require('./underscore.burrow');

var test_08a = _.burrow([
	{nodes : ['a', 'b', 'c']},
	{leafData: 'foobar', nodes : ['a', 'b', 'c']}, 
	{leafData: {bar: 'foo'}, nodes : ['a', 'c', 'b']}
	], 
	'Root Node');

console.log(test_08a);