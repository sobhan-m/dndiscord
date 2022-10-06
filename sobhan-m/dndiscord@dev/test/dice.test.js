const Dice = require('../models/dice');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe("Dice Number And Type Tests", () => {
	it("should be {1, 1}", () => {
		expect(Dice.extractDiceData("1")).to.eql({
			diceNum: 1,
			diceType: "constant"
		});
	});

	it("should be {15, 1}", () => {
		expect(Dice.extractDiceData("15")).to.eql({
			diceNum: 15,
			diceType: "constant"
		});
	});

	it("should be {1, 20}", () => {
		expect(Dice.extractDiceData("1d20")).to.eql({
			diceNum: 1,
			diceType: 20
		});
	});

	it("should be {10, 6}", () => {
		expect(Dice.extractDiceData("10d6")).to.eql({
			diceNum: 10,
			diceType: 6
		});
	});

	it("should be {1, 20}", () => {
		expect(Dice.extractDiceData("d20")).to.eql({
			diceNum: 1,
			diceType: 20
		});
	});
});

describe("Randomize Tests", () => {
	it("should be between 1 and 4", () => {
		expect(Dice.randomize(4)).to.be.within(1,4);
	});

	it("should be between 1 and 6", () => {
		expect(Dice.randomize(6)).to.be.within(1,6);
	});

	it("should be between 1 and 8", () => {
		expect(Dice.randomize(8)).to.be.within(1,8);
	});

	it("should be between 1 and 10", () => {
		expect(Dice.randomize(10)).to.be.within(1,10);
	});

	it("should be between 1 and 12", () => {
		expect(Dice.randomize(12)).to.be.within(1,12);
	});

	it("should be between 1 and 20", () => {
		expect(Dice.randomize(20)).to.be.within(1,20);
	});

	it("should be between 1 and 100", () => {
		expect(Dice.randomize(100)).to.be.within(1,100);
	});

});

describe("Dice Roll Tests", () => {
	it("should be within 1,4", () => {
		expect(Dice.rollDice(new Dice(1,4)).total).to.be.within(1, 4);
	});
	
	it("should be within 2,8", () => {
		expect(Dice.rollDice(new Dice(2,4)).total).to.be.within(2,8);
	});

	it("should be within 3,12", () => {
		expect(Dice.rollDice(new Dice(3,4)).total).to.be.within(3,12);
	});
});