const { Client, Events, ActivityType, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const handleCommands = require("./handlers/commands");

const client = new Client({
	intents: [GatewayIntentBits.GuildMessages]
});

handleCommands(client);

process.on("unhandledRejection", (error) => {
	console.error("Unhandled promise rejection.", error);
});
process.on("warning", (error) => {
	console.warn("Received a warning.", error);
});
client.on(Events.ShardError, (error) => {
	console.error("Encountered an error.", error);
});

client.on(Events.ClientReady, (client) => {
	console.log("Client ready!");
	client.user.setPresence({
		activities: [
			{
				name: "D&D",
				type: ActivityType.Playing
			}
		]
	});
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) {
		return;
	}

	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) {
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error("Encountered an error when executing command.", error);

		await interaction.reply({
			content: error.message || "There was an error while executing this command!",
			ephemeral: true
		});
	}
});

client.login(process.env.DISCORD_TOKEN);
