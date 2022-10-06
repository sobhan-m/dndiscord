const Dice = require('./dice');
const Option = require('./option');

module.exports = class Roll {

	constructor(roll, operator = "+") {
		this.roll = roll;
		this.operator = operator;
		this.option = Option.extractOptions(roll);
		this.dice = Dice.extractDiceData(roll);
	}

	/**
	 * Uses the options in the Roll object to roll the dice and calculates the results. Then returns the modified object.
	 * @param {*} roll 
	 * @returns Parameter object after rolling dice.
	 */
	static execute(roll){
		if (roll.option == undefined)
		{
			roll.results = Dice.rollDice(roll.dice);
		}
		else if (roll.option === "a")
		{
			roll.results = Option.advantage(roll.dice);
		}
		else if (roll.option === "d")
		{
			roll.results = Option.disadvantage(roll.dice);
		}
		else if (roll.option.match(/^kh\d+/))
		{
			let n = Option.extractKeepNumber(roll.option);
			roll.results = Option.keepHighest(roll.dice, n);
		}
		else if (roll.option.match(/^kl\d+/))
		{
			let n = Option.extractKeepNumber(roll.option);
			roll.results = Option.keepLowest(roll.dice, n);
		}
		else
		{
			throw "No Options Matched";
		}
	
		roll.total = roll.results.total;

		return roll;
	}

	/**
	 * Takes in an array of Roll objects that have been initialized. 
	 * Proceeds to execute them and returns a Result object with the combined total and relevant information.
	 * @param {Rolls[]} rolls 
	 * @returns 
	 */
	static processRolls(rolls)
	{
		rolls.forEach(roll => {
			Roll.execute(roll);
		});
		
		let total = rolls.reduce((total, roll) => {
			if (roll.operator == "+")
			{
				return total + roll.total;
			}
			else 
			{
				return total - roll.total;
			}
		}, 0);

		let results = {rolls: rolls, total: total}

		console.log(results);

		return results;
	}
};