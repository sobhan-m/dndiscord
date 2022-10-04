const Roll = require("./roll");
const DiscordMessage = require('./discord-message');


module.exports = class Option {

	static advantage(roll) 
	{

		const roll1Results = Roll.rollDice(roll);
		const roll2Results = Roll.rollDice(roll);

		let finalMessage;
		let finalTotal;
		let lesserMessage;
		let greaterMessage;

		if (roll1Results.total >= roll2Results.total) 
		{
			finalMessage = roll1Results.message + DiscordMessage.strikethrough(roll2Results.message);
			greaterMessage = roll1Results.message;
			lesserMessage = roll2Results.message;
		}
		else
		{
			finalMessage = DiscordMessage.strikethrough(roll1Results.message) + roll2Results.message;
			greaterMessage = roll2Results.message;
			lesserMessage = roll1Results.message;
		}

		finalTotal = Math.max(roll1Results.total, roll2Results.total);
		let lesserTotal = Math.min(roll1Results.total, roll2Results.total);
		
		return { 
			message: finalMessage, 
			total: finalTotal, 
			greaterMessage: greaterMessage, 
			lesserMessage: lesserMessage, 
			lesserTotal: lesserTotal, 
			greaterTotal: finalTotal 
		};
	}

	static disadvantage(roll) 
	{

		const roll1Results = Roll.rollDice(roll);
		const roll2Results = Roll.rollDice(roll);

		let finalMessage;
		let finalTotal;
		let lesserMessage;
		let greaterMessage;

		if (roll1Results.total <= roll2Results.total) 
		{
			finalMessage = roll1Results.message + DiscordMessage.strikethrough(roll2Results.message);
			greaterMessage = roll2Results.message;
			lesserMessage = roll1Results.message;
		}
		else
		{
			finalMessage = DiscordMessage.strikethrough(roll1Results.message) + roll2Results.message;
			greaterMessage = roll1Results.message;
			lesserMessage = roll2Results.message;
		}

		finalTotal = Math.min(roll1Results.total, roll2Results.total);
		let greaterTotal = Math.max(roll1Results.total, roll2Results.total);
		
		return { 
			message: finalMessage, 
			total: finalTotal, 
			greaterMessage: greaterMessage, 
			lesserMessage: lesserMessage, 
			lesserTotal: finalTotal, 
			greaterTotal: greaterTotal 
		};
	}

	static reroll(roll)
	{
		// TODO: Implement this.
	}

	static keepHighest(roll)
	{
		// TODO: Implement this.
	}

	static keepLowest(roll)
	{
		// TODO: Implement this.
	}

}