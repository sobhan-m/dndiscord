const Roll = require("./roll");
const DiscordMessage = require('./discord-message');


module.exports = class Option {

	static advantage(dice) 
	{
		let roll1 = Roll.rollDice(dice);
		let roll2 = Roll.rollDice(dice);

		let total;
		let values

		if (roll1.total >= roll2.total)
		{
			total = roll1.total;
			values = roll1.values;
		}
		else
		{
			total = roll2.total;
			values = roll2.values;
		}

		return {
			total: total,
			values: values,
			roll1: roll1,
			roll2: roll2
		};
	}

	static disadvantage(dice) 
	{
		let roll1 = Roll.rollDice(dice);
		let roll2 = Roll.rollDice(dice);

		let total;
		let values

		if (roll1.total <= roll2.total)
		{
			total = roll1.total;
			values = roll1.values;
		}
		else
		{
			total = roll2.total;
			values = roll2.values;
		}

		return {
			total: total,
			values: values,
			roll1: roll1,
			roll2: roll2
		};
	}

	static reroll(roll)
	{
		// TODO: Implement this.
	}

	static keepHighest(dice, n)
	{
		const values = [];

		for (let i = 0; i < dice.diceNum; ++i)
		{
			values.push(Roll.randomize(dice.diceType));
		}

		let total = values.sort((a,b) => {return a-b}).slice(-n).reduce((a, c) => {return a + c;});

		return {values: values, total: total};
	}

	static keepLowest(dice, n)
	{
		const values = [];

		for (let i = 0; i < dice.diceNum; ++i)
		{
			values.push(Roll.randomize(dice.diceType));
		}

		let total = values.sort((a,b) => {return a-b}).slice(0,n).reduce((a, c) => {return a + c;});

		return {values: values, total: total};
	}

}