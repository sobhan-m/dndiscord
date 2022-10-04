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