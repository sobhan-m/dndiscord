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
	it("should be 1", () => {
		expect(Roll.rollDice(new Roll("1", "+"))).to.eql({
			total: 1,
			message: "+1"
		});
	});

	it("should be -6", () => {
		expect(Roll.rollDice(new Roll("6", "-"))).to.eql({
			total: 6,
			message: "-6"
		});
	})

	it("should be like +(\d)", () => {
		expect(Roll.rollDice(new Roll("1d4", "+")).message).to.match(/^\+\(\d\)$/);
	});

	it("should be like +(\d+\d)", () => {
		expect(Roll.rollDice(new Roll("2d4", "+")).message).to.match(/^\+\(\d\+\d\)$/);
	});
	
	it("should be like +(\d+\d+\d)", () => {
		expect(Roll.rollDice(new Roll("3d4", "+")).message).to.match(/^\+\(\d\+\d\+\d\)$/);
	});
	
	it("should be like -(\d+\d+\d)", () => {
		expect(Roll.rollDice(new Roll("3d4", "-")).message).to.match(/^-\(\d\+\d\+\d\)$/);
	});

	it("should be within 1,4", () => {
		expect(Roll.rollDice(new Roll("1d4", "+")).total).to.be.within(1, 4);
	});
	
	it("should be within 2,8", () => {
		expect(Roll.rollDice(new Roll("2d4", "+")).total).to.be.within(2,8);
	});

	it("should be within 3,12", () => {
		expect(Roll.rollDice(new Roll("3d4", "+")).total).to.be.within(3,12);
	});

	it("should be within -12,-3", () => {
		expect(Roll.rollDice(new Roll("3d4", "-")).total).to.be.within(-12,-3);
	});
});