module.exports = class Roll {

	constructor(roll, operator = "+") {
		this.roll = roll;
		this.operator = operator;
		this.option = Roll.extractOptions(roll);
		this.dice = Roll.extractDiceData(roll);
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
		return roll.split(":").slice(1)[0];
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
			dice.diceType = "constant";
		}

		return dice;
	}

	static rollDice(dice)
	{
		let values = [];
		let total = 0;

		
		if (dice.diceType !== "constant")
		{
			for (let i = 0; i < dice.diceNum; ++i)
			{
				let value = Roll.randomize(dice.diceType);
				values.push(value);
				total += value;
			}
		}
		else
		{
			values.push(dice.diceNum);
			total = dice.diceNum;
		}
		
		return {values: values, total: total};
	}

	static randomize(diceType)
	{
		return Math.floor(Math.random() * diceType + 1);
	}
};