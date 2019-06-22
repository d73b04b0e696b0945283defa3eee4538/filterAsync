# filterAsync
The filterAsync() creates a new array with all elements that pass the test implemented by the provided function asynchronously which means no thread blocking until everything is filtered. Helps you with filtering bigarrays

## Installation

### Node.js
filterAsync is available on npm. To install it, type:

``` $ npm install filterAsync ```

## Usage

```
'use strict';

// Import Package
const filterAsync = require("filterAsync");

const games = ["Chess", "Cricket", "Soccer", "Tennis"];
const test = (sport) => ["Chess", "Tennis", "Cricket"].includes(sport);

!async function(){
	console.log(await filterAsync(games, test));
	console.log(await filterAsync(games, test, {first: 2}));
	console.log(await filterAsync(games, test, {last: 2}));
}()

```

## Run Example

``` node example ```

## Test

``` npm test ```
