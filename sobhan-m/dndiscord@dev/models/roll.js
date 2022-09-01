
module.exports = class Roll {

	constructor(roll, operator) {
		this.roll = roll;
		this.operator = operator;
		this.options = Roll.extractOptions(roll);

		const dice = Roll.extractDiceData(roll);

		this.diceNum = dice.diceNum;
		this.diceType = dice.diceType;

		const diceRoll = Roll.rollDice(this);

		this.message = diceRoll.message;
		this.total = diceRoll.total;
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

	static rollDice(roll)
	{
		let message = roll.operator;
		let values = [];
		let total = 0;

		// No need to roll d1.
		if (roll.diceType == 1)
		{
			message += String(roll.diceNum);
			total = roll.diceNum;
			return {message: message, total: total};
		}
		
		// Rolling dice and creating message.
		values.push(Roll.randomize(roll.diceType));
		message += "(" + String(values[0]);
		for (let i = 1; i < roll.diceNum; ++i)
		{
			values.push(Roll.randomize(roll.diceType));
			message += "+" + String(values[i]);
		}
		message += ")";
		total = values.reduce((accumulatedValue, currentValue) => {return accumulatedValue + currentValue;});

		// Attaching correct sign.
		if (roll.operator === "-")
		{
			total = total * -1;
		}
		
		return {message: message, total: total};
	}

	static randomize(diceType)
	{
		return Math.floor(Math.random() * diceType + 1);
	}

};