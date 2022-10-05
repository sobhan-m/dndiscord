const Message = require('../models/message');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe("Message Class Tests", () => {
	const testMessage1 = new Message("/r 1d20+1d4+6")
	const testMessage2 = new Message("/r 1d20+1d4 +6")

	it("should be '/r'", () => {
		expect(testMessage1.command).to.equal("/r");
	});
	it("should have length 1", () => {
		expect(testMessage1.arguments.length).to.equal(1);
	});
	it("should be '1d20+1d4+6'", () => {
		expect(testMessage1.arguments[0]).to.equal('1d20+1d4+6');
	});
	it("should have length 2", () => {
		expect(testMessage2.arguments.length).to.equal(2);
	});
	it("should be '1d20+1d4'", () => {
		expect(testMessage2.arguments[0]).to.equal('1d20+1d4');
	});
	it("should be '+6'", () => {
		expect(testMessage2.arguments[1]).to.equal('+6');
	});
	
});

describe("Argument Splitting Tests", () => {
	it("should be [1], [+]", () => {
		expect(Message.formatArgument("1")).to.eql({
			rolls: ["1"],
			operators: ["+"]
		});
	});

	it("should be [1], [-]", () => {
		expect(Message.formatArgument("-1")).to.eql({
			rolls: ["1"],
			operators: ["-"]
		});
	});

	it("should be [1d20,3], [+,-]", () => {
		expect(Message.formatArgument("1d20-3")).to.eql({
			rolls: ["1d20", "3"],
			operators: ["+", "-"]
		});
	});

	it("should be [1d20,3], [-,+]", () => {
		expect(Message.formatArgument("-1d20+3")).to.eql({
			rolls: ["1d20", "3"],
			operators: ["-", "+"]
		});
	});

	it("should be [1d20:a,2d4:kh1,3], [+,+,+]", () => {
		expect(Message.formatArgument("1d20:a+2d4:kh1+3")).to.eql({
			rolls: ["1d20:a", "2d4:kh1", "3"],
			operators: ["+", "+", "+"]
		});
	});
});

describe("Message Roll Dice Test", () => {

	const message = new Message("/r 1d20:a+2d4:kh1-3");

	it("should work", () => {
		message.resolveCommand();
	});
	
});