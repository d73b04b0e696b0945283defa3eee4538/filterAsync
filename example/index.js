'use strict';

// Module
const filterAsync = require("../index.js");
const games = ["Chess", "Cricket", "Soccer", "Tennis"];
const test = (sport) => ["Chess", "Tennis", "Cricket"].includes(sport);

!async function(){
	console.log(await filterAsync(games, test));
	console.log(await filterAsync(games, test, {first: 2}));
	console.log(await filterAsync(games, test, {last: 2}));
}()
