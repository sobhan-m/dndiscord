const { Client, Events, ActivityType, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
	intents: [GatewayIntentBits.GuildMessages]
});

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

client.login(process.env.DISCORD_TOKEN);
