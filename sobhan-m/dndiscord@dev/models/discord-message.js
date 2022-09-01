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


}