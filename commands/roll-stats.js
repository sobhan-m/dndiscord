const { ChatInputCommandInteraction, SlashCommandBuilder, bold, userMention, strikethrough } = require("discord.js");

const { rollDice } = require("../utilities/rolls");

module.exports = {
	data: new SlashCommandBuilder().setName("roll-stats").setDescription("Roll character stats!"),

	/**
	 * @param {ChatInputCommandInteraction} interaction
	 */
	async execute(interaction) {
		console.log("rolling stats");

		let output = [];
		for (let i = 0; i < 6; ++i) {
			const diceResults = rollDice(6, 4);

			let minIndex = 0;
			let total = 0;
			for (let j = 0; j < diceResults.length; ++j) {
				total += diceResults[j];

				if (diceResults[j] < diceResults[minIndex]) {
					minIndex = j;
				}
			}

			let formattedResults = diceResults
				.map((result, index) => {
					if (index === minIndex) {
						return strikethrough(result.toString());
					}

					return result.toString();
				})
				.join(" + ");
			output.push(`- (${formattedResults}) = ${bold(total - diceResults[minIndex])}`);
		}

		interaction.reply({
			content: `${userMention(interaction.user.id)}'s character stats are:\n${output.join("\n")}`
		});
	}
};
