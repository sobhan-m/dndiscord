const Dice = require('./dice');
const Option = require('./option');

module.exports = class Roll {

	constructor(roll, operator = "+") {
		this.roll = roll;
		this.operator = operator;
		this.option = Option.extractOptions(roll);
		this.dice = Dice.extractDiceData(roll);
	}

	static formatArgument(arg) {
		let rolls = arg.split(/[\+-]+/).filter(roll => roll !== "");
		let operators = arg.split(/[^\+-]+/).filter(op => op !== "");

		// If "+" at the beginning is implicit.
		if (operators.length == rolls.length - 1)
		{
			operators.unshift("+");
		}

		return {rolls: rolls, operators: operators};
	}
};