// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({ token: process.env.STDLIB_SECRET_TOKEN });

const Controller = require('../../../../models/controller');

if (context.params.event.content.match(/^\/r/i)) {
	const controller = new Controller(context.params.event.content, context);

	console.log(`Message Sent: ${context.params.event.content}`);

	let result = await controller.resolveCommand();

	console.log(result);

	await lib.discord.channels['@0.3.0'].messages.create({
		channel_id: context.params.event.channel_id,
		content: result,
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