const Option = require('./option');

module.exports = class DiscordMessage {

	static strikethrough(input)
	{
		return `~~${input}~~`;
	}

	static italics(input)
	{
		return `*${input}*`;
	}

	static bold(input)
	{
		return `**${input}**`;
	}

	static underline(input)
	{
		return `__${input}__`;
	}

	static code(input)
	{
		return `\`${input}\``;
	}

	static parentheses(input)
	{
		return`(${input})`;
	}

	static rollDiceMessage(rollResults)
	{
		let rolls = rollResults.rolls;

		let rollsMessages = rolls.map(roll => {
			if (roll.option == undefined)
			{
				return this.rollMessage(roll);
			}
			else if (roll.option === "a")
			{
				return this.advantageMessage(roll);
			}
			else if (roll.option === "d")
			{
				return this.disadvantageMessage(roll);
			}
			else if (roll.option.match(/^kh\d+/))
			{
				return this.keepHighestMessage(roll);
			}
			else if (roll.option.match(/^kl\d+/))
			{
				return this.keepLowestMessage(roll);
			}
			else
			{
				throw "No Options Matched";
			}
		});

		let finalMessage = rollsMessages.join("") + ` = ${this.code(rollResults.total)}`;
		
		if (finalMessage[0] === "+")
		{
			finalMessage = finalMessage.slice(1);
		}

		return finalMessage;
	}

	static rollMessage(rollObj)
	{
		let values = rollObj.results.values;
		let message = values.join("+");
		let results = rollObj.operator + this.parentheses(message);
		return results;
	}

	static advantageMessage(rollObj)
	{
		let roll1Values = rollObj.results.roll1.values;
		let roll1Message = this.parentheses(roll1Values.join("+"));

		let roll2Values = rollObj.results.roll2.values;
		let roll2Message = this.parentheses(roll2Values.join("+"));

		if (rollObj.results.total === rollObj.results.roll1.total)
		{
			roll2Message = this.strikethrough(roll2Message);
		}
		else
		{
			roll1Message = this.strikethrough(roll1Message);
		}

		let results = rollObj.operator + this.parentheses(`${roll1Message}+${roll2Message}`);
		return results;
	}

	static disadvantageMessage(rollObj)
	{
		return this.advantageMessage(rollObj);
	}

	static keepHighestMessage(rollObj)
	{
		let n = Option.extractKeepNumber(rollObj.option);

		let excludedValues = rollObj.results.values.slice(0,rollObj.results.values.length - n);
		let excludedMessage = this.strikethrough(excludedValues.join("+"));

		let includedValues = rollObj.results.values.slice(-n);
		let includedMessage = includedValues.join("+");

		let results;

		if (excludedMessage === "~~~~")
		{
			results = rollObj.operator + this.parentheses(includedMessage);
		}
		else
		{
			results = rollObj.operator + this.parentheses(`${excludedMessage}+${includedMessage}`);
		}
		
		return results;
	}

	static keepLowestMessage(rollObj)
	{
		let n = Option.extractKeepNumber(rollObj.option);

		let includedValues = rollObj.results.values.slice(0, n);
		let includedMessage = includedValues.join("+");

		let excludedValues = rollObj.results.values.slice(n);
		let excludedMessage = this.strikethrough(excludedValues.join("+"));

		let results;

		if (excludedMessage === "~~~~")
		{
			results = rollObj.operator + this.parentheses(includedMessage);
		}
		else
		{
			results = rollObj.operator + this.parentheses(`${includedMessage}+${excludedMessage}`);
		}
		
		return results;
	}
	
	// {
	// 	rolls: [
	// 	  Roll {
	// 		roll: '1d20:a',
	// 		operator: '+',
	// 		option: 'a',
	// 		dice: [Dice],
	// 		results: [Object],
	// 		total: 17
	// 	  },
	// 	  Roll {
	// 		roll: '2d4:kh1',
	// 		operator: '+',
	// 		option: 'kh1',
	// 		dice: [Dice],
	// 		results: [Object],
	// 		total: 2
	// 	  },
	// 	  Roll {
	// 		roll: '3',
	// 		operator: '-',
	// 		option: undefined,
	// 		dice: [Dice],
	// 		results: [Object],
	// 		total: 3
	// 	  }
	// 	],
	// 	total: 16
	//   }


}