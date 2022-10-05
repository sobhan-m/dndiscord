const Roll = require('./roll');


module.exports = class Message {

	constructor(message) {
		this.message = message.toString();
		this.command = message.split(" ")[0];
		this.arguments = message.split(" ").slice(1);
	}

	resolveCommand()
	{
		switch(this.command)
		{
			case "/r":
				return this.rollDice();
			case "/rchar":
				return this.rollCharacterStats();
			case "/rhelp":
				return this.help();
			case "/rinsult":
				return this.insult();
			case "/raskdm":
				return this.askDM();
			default:
				console.log("Message.resolveCommand(): Received invalid command.");

		}
	}

	rollDice()
	{
		let totalArgument = this.arguments.join("");
		let {rolls, operators} = Roll.formatArgument(totalArgument);
		let rollArray = [];
	
		for(let i = 0; i <= rolls.length; ++i)
		{
			rollArray.push(new Roll(rolls[i], operators[i]));
		}

		// Roll each one separately?

	}

	rollCharacterStats()
	{

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