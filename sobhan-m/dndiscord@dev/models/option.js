const Roll = require("./roll");
const DiscordMessage = require('./discord-message');


module.exports = class Option {

	static advantage(roll) 
	{

		const roll1Results = Roll.rollDice(roll);
		const roll2Results = Roll.rollDice(roll);

		let finalMessage;
		let finalTotal;

		if (roll1Results.total >= roll2Results.total) 
		{
			finalMessage = roll1Results.message + DiscordMessage.strikethrough(roll2Results.message);
		}
		else
		{
			finalMessage = DiscordMessage.strikethrough(roll1Results.message) + roll2Results.message;
		}

		finalTotal = Math.max(roll1Results.total, roll2Results.total);
		
		return {message: finalMessage, total: finalTotal};
	}

}