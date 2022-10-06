const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

const Roll = require('./roll');
const DiscordMessage = require('./discord-message');
const Option = require('./option');
const Dice = require('./dice');

module.exports = class Controller {

	constructor(message) {
		this.message = message.toString();
		this.command = message.split(" ")[0];
		this.arguments = message.split(" ").slice(1);
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

	resolveCommand()
	{
		switch(this.command)
		{
			case "/r":
				return `<@${context.params.event.author.id}> rolled: ` + DiscordMessage.rollDiceMessage(this.rollDice());
			case "/rchar":
				return `<@${context.params.event.author.id}>'s character ability scores:\n` + this.rollCharacterStats();
			case "/rhelp":
				return this.help();
			case "/rinsult":
				return this.insult();results.push(execute());
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

	}

	insult()
	{

	}

	askDM()
	{
		
	}



};