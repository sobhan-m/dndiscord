const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

/* Takes in a string and outputs a string. */
const convertMessageToRolledResults = (message) => {
	let messageDice = message.toString().split(" ")[1];
	let buffer = "";
	let rollResults = [];

	for (let i = 0; i < messageDice.length; ++i) {
		let char = messageDice[i];
		if (char === "+" || char === "-") {
			rollResults = rollResults.concat(rollDice(buffer));
			buffer = "";
		}

		buffer = buffer + char;
	}

	rollResults = rollResults.concat(rollDice(buffer));

	return formatRollResults(rollResults);
};

/* Takes in a string off dice commands "1d20+3" for example. */
const rollDice = (rollCommand) => {
	let sign = 1;

	if (rollCommand[0] === "+") {
		rollCommand = rollCommand.substr(1);
	}
	else if (rollCommand[0] === "-") {
		sign = -1
		rollCommand = rollCommand.substr(1);
	}

	// If it is just a number.
	if (rollCommand.search("d") === -1) {
		console.log(`rollDice() Single: ${[sign * parseInt(rollCommand)]}`);

		return [sign * parseInt(rollCommand)];
	}

	let diceCount = parseInt(rollCommand.split("d")[0]);
	let sideCount = parseInt(rollCommand.split("d")[1]);

	let rolls = [];

	for (let i = 0; i < diceCount; ++i) {
		rolls.push(Math.floor(Math.random() * sideCount + 1));
	}

	console.log(`rollDice() Rolls: ${rolls}`);

	return rolls;
};

/* Takes in a list of numbers. */
const formatRollResults = (rolls) => {
	console.log(`formatRollResults() has been entered.`);
	console.log(`formatRollResults() parameter type: ${typeof rolls}`);

	if (rolls.length <= 1) {
		console.log(`Rolls Length: ${rolls.length}`);
		return `\`${rolls[0]}\``;
	}

	let sum = rolls[0];
	let message = `(${rolls[0]}`;

	for (let i = 1; i < rolls.length; ++i) {
		let num = rolls[i];
		sum += num;


		if (num >= 0) {
			message = message + "+";
		}

		message = message + `${num}`;
	}

	message = message + `) = \`${sum}\``;

	console.log(`formatRollResults() Message: ${message}`);

	return message;
};

module.exports.convertMessageToRolledResults = convertMessageToRolledResults;
module.exports.rollDice = rollDice;
module.exports.formatRollResults = formatRollResults;