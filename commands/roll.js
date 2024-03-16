const { ChatInputCommandInteraction, SlashCommandBuilder, bold, userMention, inlineCode } = require("discord.js");

const { processRollCommand } = require("../utilities/rolls");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("Roll dice and get the results!")
		.addStringOption((option) => {
			return option.setName("command").setDescription("1d20 + 1").setRequired(true);
		}),

	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction) {
		console.log("rolling dice");

		const command = interaction.options.getString("command");

		const results = processRollCommand(command.toLowerCase());

		const formattedResults = results.rollsResults.map((roll) => {
			return `${roll.operator} (${roll.results.join(" + ")})`;
		});

		let message = formattedResults.join(" ");
		// Ignore implicit plus.
		if (message.charAt(0) === "+") {
			message = message.substring(1).trim();
		}
		message += ` = ${bold(results.total)}`;

		interaction.reply({
			content: `${userMention(interaction.user.id)} rolled ${inlineCode(command)}:\n${message}`
		});
	}
};
