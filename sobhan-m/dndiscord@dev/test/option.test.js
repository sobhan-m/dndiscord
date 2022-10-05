const Option = require('../models/option');
const Dice = require('../models/dice');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe("Advantage Tests", () => {
	it("should return greater result", () => {
		const results = Option.advantage(new Dice(1, 20));
		expect(results.total).to.equal(Math.max(results.roll1.total, results.roll2.total));
	});
});

describe("Disadvantage Tests", () => {
	it("should return lesser result", () => {
		const results = Option.disadvantage(new Dice(1, 20));
		expect(results.total).to.equal(Math.min(results.roll1.total, results.roll2.total));
	});
});

describe("Keep Highest Tests", () => {
	it("should keep highest 1", () => {
		let results = Option.keepHighest(new Dice(4, 4), 1)
		expect(results.total).to.equal(results.values[results.values.length - 1]);
	});

	it("should keep highest 2", () => {
		let results = Option.keepHighest(new Dice(4, 4), 2)
		expect(results.total).to.equal(results.values[results.values.length - 1] + results.values[results.values.length - 2]);
	});

	it("should keep highest 4", () => {
		let results = Option.keepHighest(new Dice(4, 6), 4)
		expect(results.total).to.equal(
			results.values[results.values.length - 1] 
			+ results.values[results.values.length - 2] 
			+ results.values[results.values.length - 3] 
			+ results.values[results.values.length - 4]
		);
	});
});

describe("Keep Lowest Tests", () => {
	it("should keep lowest 1", () => {
		let results = Option.keepLowest(new Dice(4, 4), 1)
		expect(results.total).to.equal(results.values[0]);
	});

	it("should keep lowest 2", () => {
		let results = Option.keepLowest(new Dice(4, 4), 2)
		expect(results.total).to.equal(results.values[0] + results.values[1]);
	});

	it("should keep lowest 4", () => {
		let results = Option.keepLowest(new Dice(4, 6), 4)
		expect(results.total).to.equal(results.values[0] + results.values[1] + results.values[2] + results.values[3]);
	})
});

describe("Option Extracting Tests", () => {
	it("should be undefined", () => {
		expect(Option.extractOptions("1d20")).to.eql(undefined);
	});

	it("should be a", () => {
		expect(Option.extractOptions("1d20:a")).to.eql("a");
	});

	it("should be d", () => {
		expect(Option.extractOptions("1d20:d")).to.eql("d");
	});

	it("should be kh1", () => {
		expect(Option.extractOptions("2d20:kh1")).to.eql("kh1");
	});

});

describe("Extracting Keep Number Tests", () => {
	it("should be 1", () => {
		expect(Option.extractKeepNumber("kh1")).to.eql(1);
	});

	it("should be 2", () => {
		expect(Option.extractKeepNumber("kh2")).to.eql(2);
	});

	it("should be 3", () => {
		expect(Option.extractKeepNumber("kl3")).to.eql(3);
	});

	it("should be 4", () => {
		expect(Option.extractKeepNumber("kl4")).to.eql(4);
	});
});