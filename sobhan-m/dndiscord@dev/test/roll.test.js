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