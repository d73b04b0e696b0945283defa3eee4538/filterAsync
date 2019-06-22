'use strict';

const debug = require("debug")("filterAsync");

// Returns elements that satisfy the test fn
/**
* Example:
* filterAsync(
*	fruitsArray,
*	(fruit) => fruit.toLowerCase() === 'orange', 
*	{
*		first: 5,
*	}
* );
*/

// Use first or last to get first/last n matches
/**
* Example:
*
* const firstThreeOranges = (fruitsArray) => {
*	const test = (fruit) => fruit.toLowerCase() === 'orange';
*	return filterAsync(fruitsArray, test, {first: 3});
* }
*/

/*
const lastThreeOranges = (fruitsArray) => {
	const test = (fruit) => fruit.toLowerCase() === 'orange';
	return filterAsync(fruitsArray, test, {last: 3});
}*/

function filterAsync(input, test, {first, last} = {}) {
	debug('filterAsync()');
	
	if(!Array.isArray(input)){
		return Promise.reject(new TypeError(`The input argument must be type array. Received type ${typeof input}`));
	}

	if(!(test instanceof Function)) {
		return Promise.reject(new TypeError(`The test argument must be type function. Received type ${typeof test}`));
	}

	const forward = (!first && !!last)?false:true;
	let index = forward?0:(input.length - 1);
	let validElements = [];

	if(input.length == 0 || (forward && first <= 0) || (!forward && last <= 0)){
		return Promise.resolve(validElements);
	}

	return new Promise((resolve, reject) => {
		
		(function fn() {
			const element = input[index];
			const valid = !!test(element);
			debug(`index: ${index}`);
			debug(`Walking Forward: ${forward}`);
			debug(`${element}: ${valid?'valid':'invalid'}`);
			if(valid){
				validElements.push(element);
			}

			// Move index
			forward?index+=1:index-=1;
			const shouldStop = forward
			?(index >= input.length || (first && first <= validElements.length))
			:(index < 0 || (last && last <= validElements.length));

			if(shouldStop) {
				return resolve(validElements);
			} else {
				setImmediate(() => fn());
			}
		})();

	});
}


module.exports = filterAsync;