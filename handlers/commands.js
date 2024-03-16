const { Collection, REST, Routes, RESTPostAPIChatInputApplicationCommandsJSONBody } = require("discord.js");

const rollStatsCommand = require("../commands/roll-stats");
const rollCommand = require("../commands/roll");

module.exports = async function handleCommands(client) {
	client.commands = new Collection();
	client.commands.set(rollStatsCommand.data.name, rollStatsCommand);
	client.commands.set(rollCommand.data.name, rollCommand);

	const commandsToRegister = [rollStatsCommand.data.toJSON(), rollCommand.data.toJSON()];

	const rest = new REST().setToken(process.env.DISCORD_TOKEN);
	(async () => {
		try {
			await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
				body: commandsToRegister
			});

			console.log("Successfully registered application commands!");
		} catch (error) {
			console.error(error);
		}
	})();
}
