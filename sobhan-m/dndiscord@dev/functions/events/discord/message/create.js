// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

const roll = require('./roll');
const stats = require("./stats");

if (context.params.event.content.match(/^\/r .*/i)) {
	let messageContent = context.params.event.content.match(/^\/r .*/i);

	console.log(`Message Sent: ${messageContent}`);

	await lib.discord.channels['@0.3.0'].messages.create({
		channel_id: context.params.event.channel_id,
		content: `<@${context.params.event.author.id}> rolled: ${roll.convertMessageToRolledResults(messageContent)}`,
		message_reference: {
			message_id: context.params.event.id
		}
	});
}
else if (context.params.event.content.match(/^\/rchar7/i)) {

	let message = "";
	for (let i = 0; i < 7; ++i) {
		message += `\n${stats.rollStats()}`
	}

	await lib.discord.channels['@0.3.0'].messages.create({
		channel_id: context.params.event.channel_id,
		content: `<@${context.params.event.author.id}>'s character ability scores: ${message}`,
		message_reference: {
			message_id: context.params.event.id
		}
	});
}
// Rolls a character if /rchar is used
else if (context.params.event.content.match(/^\/rchar/i)) {

	let message = "";
	for (let i = 0; i < 6; ++i) {
		message += `\n${stats.rollStats()}`
	}

	await lib.discord.channels['@0.3.0'].messages.create({
		channel_id: context.params.event.channel_id,
		content: `<@${context.params.event.author.id}>'s character ability scores: ${message}`,
		message_reference: {
			message_id: context.params.event.id
		}
	});
}
// Help
else if (context.params.event.content.match(/^\/rhelp/i)) {

	let message = "";
	message += "`/rhelp`: Brings up a list of commands.\n";
	message += "`/r [rolls]`: Rolls the given dice and finds the total. Such as `/r 2d6+1d4+4`.\n";
	message += "`/rchar`: Rolls 4d6 and drops the smallest to create 6 ability scores.\n";
	message += "`/rchar7`: Rolls 4d6 and drops the smallest to create 7 ability scores.\n";


	await lib.discord.channels['@0.3.0'].messages.create({
		channel_id: context.params.event.channel_id,
		content: `${message}`,
		message_reference: {
			message_id: context.params.event.id
		}
	});
}

await lib.discord.users['@0.2.1'].me.status.update({
	activity_name: `D&D | /rhelp`,
	activity_type: 'GAME',
	status: 'ONLINE'
});