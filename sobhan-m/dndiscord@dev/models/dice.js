module.exports = class Dice {

	constructor(diceNum, diceType){
		this.diceNum = diceNum;
		this.diceType = diceType;
	}

	/**
	 * Takes in a roll string and returns the associated dice object.
	 * @param {String} roll 
	 * @returns dice object.
	 */
	static extractDiceData(roll) {
		let optionlessRoll = roll.split(":")[0];

		 let diceNum;
		 let diceType;
		
		if (optionlessRoll.includes("d"))
		{
			let diceInfoArray = optionlessRoll.split("d");

			diceNum = diceInfoArray[0] === "" ? 1 : parseInt(diceInfoArray[0]);
			diceType = parseInt(diceInfoArray[1]);
		}
		else
		{
			diceNum = parseInt(optionlessRoll);
			diceType = "constant";
		}

		return new Dice(diceNum, diceType);
	}

	/**
	 * Takes in a dice object and rolls them. Returning the total and an array of rolled values.
	 * @param {Dice} dice 
	 * @returns Unsigned and array of rolled values.
	 */
	static rollDice(dice)
	{
		let values = [];
		let total = 0;

		
		if (dice.diceType !== "constant")
		{
			for (let i = 0; i < dice.diceNum; ++i)
			{
				let value = Dice.randomize(dice.diceType);
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

	/**
	 * Randomly returns an integer from 1 to diceType, inclusive.
	 * @param {Number} diceType The sides on a dice.
	 * @returns A random value within [1, diceType] inclusive.
	 */
	static randomize(diceType)
	{
		return Math.floor(Math.random() * diceType + 1);
	}
};