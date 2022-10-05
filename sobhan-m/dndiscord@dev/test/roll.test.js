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

	it("should be [1d20:a,2d4:kh1,3], [+,+,+]", () => {
		expect(Roll.formatArgument("1d20:a+2d4:kh1+3")).to.eql({
			rolls: ["1d20:a", "2d4:kh1", "3"],
			operators: ["+", "+", "+"]
		});
	});

	
});
