const Roll = require('../models/roll');
const Dice = require('../models/dice');
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

	it("should be [1d20:a,2d4:kh1,3], [+,+,+]", () => {
		expect(Roll.formatArgument("1d20:a+2d4:kh1+3")).to.eql({
			rolls: ["1d20:a", "2d4:kh1", "3"],
			operators: ["+", "+", "+"]
		});
	});

	
});

describe("Option Extracting Tests", () => {
	it("should be undefined", () => {
		expect(Roll.extractOptions("1d20")).to.eql(undefined);
	});

	it("should be a", () => {
		expect(Roll.extractOptions("1d20:a")).to.eql("a");
	});

	it("should be d", () => {
		expect(Roll.extractOptions("1d20:d")).to.eql("d");
	});

	it("should be kh1", () => {
		expect(Roll.extractOptions("2d20:kh1")).to.eql("kh1");
	});

});

describe("Dice Number And Type Tests", () => {
	it("should be {1, 1}", () => {
		expect(Roll.extractDiceData("1")).to.eql({
			diceNum: 1,
			diceType: "constant"
		});
	});

	it("should be {15, 1}", () => {
		expect(Roll.extractDiceData("15")).to.eql({
			diceNum: 15,
			diceType: "constant"
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
});

describe("Randomize Tests", () => {
	it("should be between 1 and 4", () => {
		expect(Roll.randomize(4)).to.be.within(1,4);
	});

	it("should be between 1 and 6", () => {
		expect(Roll.randomize(6)).to.be.within(1,6);
	});

	it("should be between 1 and 8", () => {
		expect(Roll.randomize(8)).to.be.within(1,8);
	});

	it("should be between 1 and 10", () => {
		expect(Roll.randomize(10)).to.be.within(1,10);
	});

	it("should be between 1 and 12", () => {
		expect(Roll.randomize(12)).to.be.within(1,12);
	});

	it("should be between 1 and 20", () => {
		expect(Roll.randomize(20)).to.be.within(1,20);
	});

	it("should be between 1 and 100", () => {
		expect(Roll.randomize(100)).to.be.within(1,100);
	});

});

describe("Dice Roll Tests", () => {
	it("should be within 1,4", () => {
		expect(Roll.rollDice(new Dice(1,4)).total).to.be.within(1, 4);
	});
	
	it("should be within 2,8", () => {
		expect(Roll.rollDice(new Dice(2,4)).total).to.be.within(2,8);
	});

	it("should be within 3,12", () => {
		expect(Roll.rollDice(new Dice(3,4)).total).to.be.within(3,12);
	});
});