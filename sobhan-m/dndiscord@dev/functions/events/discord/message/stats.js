const roll = require('./roll');

/* Rolls and returns a message for one game stat using 4d6 method. */
function rollStats() {
	let scores = roll.rollDice("4d6");
	let sum = scores.reduce((a, b) => a + b, 0);
	let min = Math.min(...scores);
	let total = sum - min;

	return `Rolls: \`${scores[0]}, ${scores[1]}, ${scores[2]}, ${scores[3]}\`. Total: \`${total}\``;
}

module.exports.rollStats = rollStats;
