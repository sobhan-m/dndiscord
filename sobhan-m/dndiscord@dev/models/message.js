const Roll = require('./roll');
const Option = require('./option');

const execute = (roll) => {
	if (roll.option == undefined)
	{
		roll.results = Roll.rollDice(roll.dice);
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
		let n = parseInt(roll.option.substring(2));
		roll.results = Option.keepHighest(roll.dice, n);
	}
	else if (roll.option.match(/^kl\d+/))
	{
		let n = parseInt(roll.option.substring(2));
		roll.results = Option.keepLowest(roll.dice, n);
	}
	else
	{
		throw "No Options Matched";
	}

	roll.total = roll.results.total;
}

const processMessage = (rollArray) => {
	


};


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
		let {rolls, operators} = Roll.formatArgument(totalArgument);
		let results = {};
		results.rolls = [];
	
		for(let i = 0; i < rolls.length; ++i)
		{
			results.rolls.push(new Roll(rolls[i], operators[i]));
		}

		results.rolls.forEach(roll => {
			execute(roll);
		})
		results.total = results.rolls.reduce((total, roll) => {
			if (roll.operator == "+")
			{
				return total + roll.total;
			}
			else 
			{
				return total - roll.total;
			}
		}, 0);

		console.log(results);

		return results;

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