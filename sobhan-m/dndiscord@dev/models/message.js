
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
			case "/rvm":
				return this.viciousMockery();
			case "/raskdm":
				return this.askDM();
			default:
				console.log("Message.resolveCommand(): Received invalid command.");

		}
	}

	rollDice()
	{

	}

	rollCharacterStats()
	{

	}

	help()
	{

	}

	viciousMockery()
	{

	}

	askDM()
	{
		
	}



};