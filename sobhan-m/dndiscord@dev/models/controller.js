const Roll = require('./roll');
const DiscordMessage = require('./discord-message');
const Option = require('./option');
const Dice = require('./dice');

const responses = require('../helper/responses');
const getInsult = require('../helper/insult');

module.exports = class Controller {

	constructor(message, context=undefined) {
		this.message = message.toString();
		this.command = message.split(" ")[0];
		this.arguments = message.split(" ").slice(1);
		this.context = context;
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

	async resolveCommand()
	{
		switch(this.command)
		{
			case "/r":
				return `<@${this.context.params.event.author.id}> rolled: ` + DiscordMessage.rollDiceMessage(this.rollDice());
			case "/rchar":
				return `<@${this.context.params.event.author.id}>'s character ability scores:\n` + this.rollCharacterStats();
			case "/rhelp":
				return this.help();
			case "/rinsult":
				return await Controller.insult();
			case "/raskdm":
				return this.askDM();
			default:
				console.log("Message.resolveCommand(): Received invalid command.");
		}
	}

	rollDice()
	{
		let totalArgument = this.arguments.join("");
		let {rolls, operators} = Controller.formatArgument(totalArgument);
		let results = {};
		results.rolls = [];
	
		for(let i = 0; i < rolls.length; ++i)
		{
			results.rolls.push(new Roll(rolls[i], operators[i]));
		}

		return Roll.processRolls(results.rolls);
	}

	rollCharacterStats()
	{
		let totalArgument = this.arguments.join("");

		let n = 6;

		if (! isNaN(parseInt(totalArgument)))
		{
			n = parseInt(totalArgument);
		}

		let message = "";

		for (let i = 0; i < n; ++i)
		{
			message += DiscordMessage.characterRowMessage(Option.keepHighest(new Dice(4,6),3)) + "\n";
		}

		return message;

	}

	help()
	{
		let message = "";

		// /r
		message += "`/r`: Used to make a roll. Such as `/r 1d20:a+1d4+2`.\n";
		message += "-- `:a`: An option that rolls with advantage.\n";
		message += "-- `:d`: An option that rolls with disadvantage.\n";
		message += "-- `:kh[n]`: An option that keeps the highest [n] results.\n";
		message += "-- `:kl[n]`: An option that keeps the lowest [n] results.\n";

		// /rchar
		message += "`/rchar [n]`: Used to roll characters with the default roll 4d6 keep highest 3.\n";
		message += "-- `[n]`: Determines how many times it rolls 4d6. The default is 6 times, one for each stat.\n";
		
		// /rhelp
		message += "`/rhelp`: Returns tips on how to use the various commands.\n";

		// /rinsult
		message += "`/rinsult`: Randomly retrieves an insult in case you can't come up with something for Viscious Mockery.\n";

		// /raskdm
		message += "`/raskdm`: Receive a response from the bot, as if it were the DM. Results may vary.\n"

		return message;
	}

	static async insult() 
	{
		return await getInsult();
	}

	askDM()
	{
		return responses[Dice.randomize(responses.length)-1];
	}



};