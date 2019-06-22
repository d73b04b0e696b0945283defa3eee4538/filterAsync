'use strict';

const debug = require('debug')('filterAsync/test');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const assert = chai.assert;

const filterAsync = require('../index.js');


describe('filterAsync', function () {
	describe('When input argument is anything but an Array', function () {
		const notArrayValues = {
			'null': null,
			'undefined': undefined,
			'1': 1,
			'Number(1)': Number(1),
			'string': 'string',
			'String("string")': String("String"),
			'false': false,
			'Boolean(true)': Boolean(true),
			'Function': () => {},
			'Object': {}
		};
		const keys = Object.keys(notArrayValues);

		for(let i = 0; i < keys.length; i +=1){
			const key = keys[i];
			const value = notArrayValues[key];

			it(`Should return PromiseRejection when the value is ${key}`, function () {
				const actual = filterAsync(value);
				return assert.isRejected(actual);
			});
		}
		
	});	

	describe('When test argument is anything but a function', function () {
		const notArrayValues = {
			'null': null,
			'undefined': undefined,
			'1': 1,
			'Number(1)': Number(1),
			'string': 'string',
			'String("string")': String("String"),
			'false': false,
			'Boolean(true)': Boolean(true),
			'[]': [],
			'Array()': Array(),
			'Object': {}
		};
		const keys = Object.keys(notArrayValues);

		for(let i = 0; i < keys.length; i +=1){
			const key = keys[i];
			const value = notArrayValues[key];

			it(`Should return PromiseRejection when the value is ${key}`, function () {
				const actual = filterAsync([], value);

				return assert.isRejected(actual);
			});
		}
	});

	describe('When input and test arguments are valid', function () {
		it('Should return an empty array when input arr has no elements', function () {
			const input = [];
			const test = () => {};
			const actual = filterAsync(input, test);
			const expected = [];

			return assert.becomes(actual, expected);
		});

		it('Should return an empty array when test returns a falsy value', function () {
			const input = ['Mango', 'Lemon', 'Cherry', 'Orange'];
			const test = (fruit) => {};
			const actual = filterAsync(input, test);
			const expected = [];

			return assert.becomes(actual, expected);
		});

		it('Should return a non empty array when input is not an empty array and test returns any truthy value', function () {
			const input = ['Mango', 'Lemon', 'Cherry', 'Orange'];
			const test = (fruit) => fruit.toLowerCase() === 'lemon';
			const actual = filterAsync(input, test);
			const expected = ['Lemon'];

			return assert.becomes(actual, expected);
		});
	});

	describe('first n matches', function () {
		it("Should return all first matches when option 'first' is nil", function () {
			const input = ['Mango', 'Lemon', 'Cherry', 'Orange'];
			const test = (fruit) => fruit.toLowerCase().match(/lemon|orange/);
			const actual = filterAsync(input, test, );
			const expected = ['Lemon', 'Orange'];

			return assert.eventually.sameOrderedMembers(actual, expected);
		});

		it("Should return first match only when option 'first' is 1", function () {
			const input = ['Mango', 'Lemon', 'Cherry', 'Orange'];
			const test = (fruit) => fruit.toLowerCase().match(/lemon|orange/);
			const actual = filterAsync(input, test, {first: 1});
			const expected = ['Lemon'];

			return assert.becomes(actual, expected);
		});

		it("Should return first matches even when option 'last' is set along with option 'first'", function () {
			const input = ['Mango', 'Lemon', 'Cherry', 'Orange'];
			const test = (fruit) => fruit.toLowerCase().match(/lemon|orange/);
			const actual = filterAsync(input, test, {first: 1, last: 2});
			const expected = ['Lemon'];

			return assert.eventually.sameOrderedMembers(actual, expected);
		});

		it("Should return no matches when option 'first' is negative number", function () {
			const input = ['Mango', 'Lemon', 'Cherry', 'Orange'];
			const test = (fruit) => fruit.toLowerCase().match(/lemon|orange/);
			const actual = filterAsync(input, test, {first: -10});
			const expected = [];

			return assert.eventually.sameOrderedMembers(actual, expected);
		});

		it("Should return all first matches when option 'first' type is not Number", function () {
			const input = ['Mango', 'Lemon', 'Cherry', 'Orange'];
			const test = (fruit) => fruit.toLowerCase().match(/lemon|orange/);
			const actual = filterAsync(input, test, {first: 'abc'});
			const expected = ['Lemon', 'Orange'];

			return assert.eventually.sameOrderedMembers(actual, expected);
		});
		
	});


	describe('last n matches', function () {

		it("Should return last match only when option 'last' is 1 ", function () {
			const input = ['Mango', 'Lemon', 'Cherry', 'Orange'];
			const test = (fruit) => fruit.toLowerCase().match(/lemon|orange/);
			const actual = filterAsync(input, test, {last: 1});
			const expected = ['Orange'];

			return assert.becomes(actual, expected);
		});
		
		it("Should return last n matches when option 'last' is positive n", function () {
			const input = ['Mango', 'Lemon', 'Cherry', 'Orange'];
			const test = (fruit) => fruit.toLowerCase().match(/lemon|orange/);
			const actual = filterAsync(input, test, {last: 10});
			const expected = ['Orange', 'Lemon'];

			return assert.eventually.sameOrderedMembers(actual, expected);
		});

		it("Should return no matches when option 'last' is negative number", function () {
			const input = ['Mango', 'Lemon', 'Cherry', 'Orange'];
			const test = (fruit) => fruit.toLowerCase().match(/lemon|orange/);
			const actual = filterAsync(input, test, {last: -10});
			const expected = [];

			return assert.eventually.sameOrderedMembers(actual, expected);
		});

		it("Should return all last matches when option 'last' type is not Number", function () {
			const input = ['Mango', 'Lemon', 'Cherry', 'Orange'];
			const test = (fruit) => fruit.toLowerCase().match(/lemon|orange/);
			const actual = filterAsync(input, test, {last: 'abc'});
			const expected = ['Orange', 'Lemon'];

			return assert.eventually.sameOrderedMembers(actual, expected);
		});

	});


});