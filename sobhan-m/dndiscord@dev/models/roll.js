
module.exports = class Roll {

	constructor(command, argument) {
		this.command = command;
		this.arg = argument;
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