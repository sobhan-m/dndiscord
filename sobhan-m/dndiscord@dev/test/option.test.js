const Roll = require('../models/roll');
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