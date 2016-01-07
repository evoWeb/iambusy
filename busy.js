#!/usr/bin/env node
var busylightTimer,
	busylight = require('busylight').get();

busylight.connect();
busylight.light('green');

busylightTimer = setInterval(function() {
	busylight.send();
}.bind(busylight), 29000);

process.stdout.write('\u001B[2J\u001B[0;0f');
console.log('Press a key [(r)red|(g)reen|(y)ellow|(o)ff|(q)uit]');


/**
 * Get color for matching parameter
 *
 * @param {string} parameter
 * @returns {string}
 */
function getColor(parameter) {
	var color = '';

	if (parameter == 'r') {
		color = 'red';
	} else if (parameter == 'g') {
		color = 'green';
	} else if (parameter == 'y') {
		color = 'yellow';
	}

	return color;
}


var stdin = process.stdin;
stdin.resume();
stdin.setEncoding('utf8');
stdin.setRawMode(true);
stdin.on('data', function(char) {
	if (char == 'q') {
		busylight.off();
		clearInterval(busylightTimer);
		process.exit(0);
	} else if (char == 'o') {
		busylight.off();
	} else {
		var color = getColor(char);
		if (color != '') {
			busylight.light(color);
		}
	}

	process.stdout.cursorTo(0);
});