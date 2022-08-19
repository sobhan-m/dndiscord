
module.exports = class Roll {

	constructor(roll, operator) {
		this.roll = roll;
		this.operator = operator;
		this.options = extractOptions(roll);

		const dice = extractDiceData(roll);

		this.diceNum = dice.diceNum;
		this.diceType = dice.diceType;
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

	static extractOptions(roll) {
		let options = roll.split(":").slice(1);
		return options;
	}

	static extractDiceData(roll) {
		let optionlessRoll = roll.split(":")[0];

		const dice = {};
		
		if (optionlessRoll.includes("d"))
		{
			let diceInfoArray = optionlessRoll.split("d");

			dice.diceNum = diceInfoArray[0] === "" ? 1 : parseInt(diceInfoArray[0]);
			dice.diceType = parseInt(diceInfoArray[1]);
		}
		else
		{
			dice.diceNum = parseInt(optionlessRoll);
			dice.diceType = 1;
		}

		return dice;

	}

};