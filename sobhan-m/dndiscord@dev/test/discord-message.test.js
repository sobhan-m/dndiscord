const DiscordMessage = require('../models/discord-message');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe("Markdown Tests", () => {
	it("should be ~~hello world~~", () => {
		expect(DiscordMessage.strikethrough("hello world")).to.equal("~~hello world~~");
	});

	it("should be *hello world*", () => {
		expect(DiscordMessage.italics("hello world")).to.equal("*hello world*");
	});

	it("should be **hello world**", () => {
		expect(DiscordMessage.bold("hello world")).to.equal("**hello world**");
	});

	it("should be __hello world__", () => {
		expect(DiscordMessage.underline("hello world")).to.equal("__hello world__");
	});

	it("should be `hello world`", () => {
		expect(DiscordMessage.code("hello world")).to.equal("`hello world`");
	});
});