/**
 * @param {number} numOfSides
 */
function rollDie(numOfSides) {
	return Math.floor(Math.random() * numOfSides + 1);
}

/**
 * @param {number} numOfSides
 * @param {number} numOfDice
 */
function rollDice(numOfSides, numOfDice) {
	const rollResults = [];
	for (let i = 0; i < numOfDice; ++i) {
		rollResults.push(rollDie(numOfSides));
	}
	return rollResults;
}

/**
 * @param {string} input "1d4 + 1d6"
 */
function removeWhiteSpace(input) {
	return input.trim().split(" ").join("");
}

/**
 * @param {string} command "1d4+1d6"
 */
function splitOperators(command) {
	const rolls = command.split(/[\+-]+/).filter((roll) => roll !== "");
	const operators = command.split(/[^\+-]+/).filter((op) => op !== "");

	// If "+" at the beginning is implicit.
	if (operators.length == rolls.length - 1) {
		operators.unshift("+");
	}

	const rollsObjects = rolls.map((roll, i) => {
		return {
			roll,
			operator: operators[i]
		};
	});

	return rollsObjects;
}

/**
 *
 * @param {string} roll "2d8"
 */
function splitDice(roll) {
	const [numOfDice, numOfSides] = roll.split("d");
	return {
		numOfDice: Number(numOfDice),
		numOfSides: Number(numOfSides)
	};
}

/**
 * @param {string} dice "2d8"
 */
function isDice(dice) {
	// Scalar otherwise.
	return dice.includes("d");
}

/**
 * Formatted as: "1d4 + 2d6 + d8 - 2"
 * @param {string} rollCommand
 */
function processRollCommand(rollCommand) {
	const spacelessCommand = removeWhiteSpace(rollCommand);
	const rolls = splitOperators(spacelessCommand);
	const rollsResults = rolls.map(({ roll, operator }) => {
		let results = [];
		if (isDice(roll)) {
			const { numOfDice, numOfSides } = splitDice(roll);
			results = rollDice(numOfSides, numOfDice);
		} else {
			// Is a scalar.
			results = [Number(roll)];
		}

		const total = results.reduce((currentSum, currentVal) => {
			return currentSum + currentVal;
		});

		return {
			roll,
			operator,
			results,
			total
		};
	});

	let total = 0;
	for (let result of rollsResults) {
		const sign = result.operator === "+" ? 1 : -1;
		total += result.total * sign;
	}

	return {
		rollsResults,
		total
	};
}

module.exports = {
	rollDie,
	rollDice,
	processRollCommand
};
