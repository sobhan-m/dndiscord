const Roll = require('../models/roll');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe("Argument Splitting Tests", () => {
	it("should be [1], [+]", () => {
		expect(Roll.formatArgument("1")).to.eql({
			rolls: ["1"],
			operators: ["+"]
		});
	});

	it("should be [1], [-]", () => {
		expect(Roll.formatArgument("-1")).to.eql({
			rolls: ["1"],
			operators: ["-"]
		});
	});

	it("should be [1d20,3], [+,-]", () => {
		expect(Roll.formatArgument("1d20-3")).to.eql({
			rolls: ["1d20", "3"],
			operators: ["+", "-"]
		});
	});

	it("should be [1d20,3], [-,+]", () => {
		expect(Roll.formatArgument("-1d20+3")).to.eql({
			rolls: ["1d20", "3"],
			operators: ["-", "+"]
		});
	});
});

describe("Option Extracting Tests", () => {
	it("should be []", () => {
		expect(Roll.extractOptions("1d20")).to.eql([]);
	});

	it("should be [a]", () => {
		expect(Roll.extractOptions("1d20:a")).to.eql(["a"]);
	});

	it("should be [d]", () => {
		expect(Roll.extractOptions("1d20:d")).to.eql(["d"]);
	});

	it("should be [a, rr1,2]", () => {
		expect(Roll.extractOptions("1d20:a:rr1,2")).to.eql(["a", "rr1,2"]);
	});

});

describe("Dice Number And Type Tests", () => {
	it("should be {1, 1}", () => {
		expect(Roll.extractDiceData("1")).to.eql({
			diceNum: 1,
			diceType: 1
		});
	});

	it("should be {15, 1}", () => {
		expect(Roll.extractDiceData("15")).to.eql({
			diceNum: 15,
			diceType: 1
		});
	});

	it("should be {1, 20}", () => {
		expect(Roll.extractDiceData("1d20")).to.eql({
			diceNum: 1,
			diceType: 20
		});
	});

	it("should be {10, 6}", () => {
		expect(Roll.extractDiceData("10d6")).to.eql({
			diceNum: 10,
			diceType: 6
		});
	});

	it("should be {1, 20}", () => {
		expect(Roll.extractDiceData("d20")).to.eql({
			diceNum: 1,
			diceType: 20
		});
	});
})