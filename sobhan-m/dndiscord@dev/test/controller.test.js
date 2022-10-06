const Controller = require('../models/controller');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe("Message Class Tests", () => {
	const testController1 = new Controller("/r 1d20+1d4+6")
	const testController2 = new Controller("/r 1d20+1d4 +6")

	it("should be '/r'", () => {
		expect(testController1.command).to.equal("/r");
	});
	it("should have length 1", () => {
		expect(testController1.arguments.length).to.equal(1);
	});
	it("should be '1d20+1d4+6'", () => {
		expect(testController1.arguments[0]).to.equal('1d20+1d4+6');
	});
	it("should have length 2", () => {
		expect(testController2.arguments.length).to.equal(2);
	});
	it("should be '1d20+1d4'", () => {
		expect(testController2.arguments[0]).to.equal('1d20+1d4');
	});
	it("should be '+6'", () => {
		expect(testController2.arguments[1]).to.equal('+6');
	});
	
});

describe("Argument Splitting Tests", () => {
	it("should be [1], [+]", () => {
		expect(Controller.formatArgument("1")).to.eql({
			rolls: ["1"],
			operators: ["+"]
		});
	});

	it("should be [1], [-]", () => {
		expect(Controller.formatArgument("-1")).to.eql({
			rolls: ["1"],
			operators: ["-"]
		});
	});

	it("should be [1d20,3], [+,-]", () => {
		expect(Controller.formatArgument("1d20-3")).to.eql({
			rolls: ["1d20", "3"],
			operators: ["+", "-"]
		});
	});

	it("should be [1d20,3], [-,+]", () => {
		expect(Controller.formatArgument("-1d20+3")).to.eql({
			rolls: ["1d20", "3"],
			operators: ["-", "+"]
		});
	});

	it("should be [1d20:a,2d4:kh1,3], [+,+,+]", () => {
		expect(Controller.formatArgument("1d20:a+2d4:kh1+3")).to.eql({
			rolls: ["1d20:a", "2d4:kh1", "3"],
			operators: ["+", "+", "+"]
		});
	});
});