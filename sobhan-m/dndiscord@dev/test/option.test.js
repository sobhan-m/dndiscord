const Roll = require('../models/roll');
const Option = require('../models/option');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe("Advantage Tests", () => {
	it("should return greater result", () => {
		const results = Option.advantage(new Roll("1d20:a", "+"));
		expect(results.total).to.equal(results.greaterTotal);
		expect(results.total).to.be.greaterThanOrEqual(results.lesserTotal);
	});
});

describe("Disadvantage Tests", () => {
	it("should return lesser result", () => {
		const results = Option.disadvantage(new Roll("1d20:a", "+"));
		expect(results.total).to.equal(results.lesserTotal);
		expect(results.total).to.be.lessThanOrEqual(results.greaterTotal);
	});
});

describe("Keep Highest Tests", () => {
	// I don't know how to test things that are meant to be random.

	it("should keep highest 2", () => {
		console.log(Option.keepHighest(new Roll("4d4", "+"), 2));
	})
});

describe("Keep Lowest Tests", () => {
	// I don't know how to test things that are meant to be random.

	it("should keep lowest 2", () => {
		console.log(Option.keepLowest(new Roll("4d4", "+"), 2));
	})
});