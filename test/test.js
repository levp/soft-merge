'use strict';

var expect = require('chai').expect;
var softMerge = require('../soft-merge');

suite('soft-merge');

mergeTest('flat objects', {
	target: {a: 1, b: 2},
	source: {b: 3, c: 4},
	expectedResult: {a: 1, b: 3, c: 4}
});

mergeTest('deep objects', {
	target: {
		one: {
			key: 1,
			object: {value: 'Hello'}
		},
		two: {
			three: {
				four: {a: false, b: function () { }},
				six: {named: 'No.'}
			}
		}
	},
	source: {
		one: {
			key: 'juan',
			object: {val: undefined}
		},
		two: {
			three: {
				four: {a: true, b: 9},
				five: null
			}
		}
	},
	expectedResult: {
		one: {
			key: 'juan',
			object: {value: 'Hello', val: undefined}
		},
		two: {
			three: {
				four: {a: true, b: 9},
				five: null,
				six: {named: 'No.'}
			}
		}
	}
});

mergeTest('concat arrays', {
	target: {
		object: {a: 1, b: 2},
		ids: [1, 2, 3],
		people: {
			names: [
				'Jack',
				'Dovahkiin',
				'Daniel'
			]
		}
	},
	source: {
		object: {b: 5, c: 6},
		ids: [3, 4, 5],
		people: {
			names: [
				'Blade',
				'Batman',
				'Lex'
			]
		},
		what: 42
	},
	expectedResult: {
		object: {a: 1, b: 5, c: 6},
		ids: [1, 2, 3, 3, 4, 5],
		people: {
			names: [
				'Jack',
				'Dovahkiin',
				'Daniel',
				'Blade',
				'Batman',
				'Lex'
			]
		},
		what: 42
	}
});

function mergeTest(name, args) {
	test(name, function () {
		softMerge(args.target, args.source);
		expect(args.target).to.deep.equal(args.expectedResult);
	});
}