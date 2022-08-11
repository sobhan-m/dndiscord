
module.exports = class Message {

	constructor(message) {
		this.message = message.toString();
		this.command = message.split(" ")[0];
		this.arguments = message.split(" ").slice(1);
	}

};