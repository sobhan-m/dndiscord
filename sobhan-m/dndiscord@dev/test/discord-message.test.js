const DiscordMessage = require('../models/discord-message');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe("Markdown Tests", () => {
	it("should be ~~hello world~~", () => {
		expect(DiscordMessage.strikethrough("hello world")).to.equal("~~hello world~~");
	});

	it("should be *hello world*", () => {
		expect(DiscordMessage.italics("hello world")).to.equal("*hello world*");
	});

	it("should be **hello world**", () => {
		expect(DiscordMessage.bold("hello world")).to.equal("**hello world**");
	});

	it("should be __hello world__", () => {
		expect(DiscordMessage.underline("hello world")).to.equal("__hello world__");
	});

	it("should be `hello world`", () => {
		expect(DiscordMessage.code("hello world")).to.equal("`hello world`");
	});
});

describe("Roll Message Tests", () => {
	it("should be +(1)", () => {
		let rollObj = {
			results: {
				values: [1]
			},
			operator: "+"
		};

		expect(DiscordMessage.rollMessage(rollObj)).to.equal("+(1)");
	});

	it("should be -(6)", () => {
		let rollObj = {
			results: {
				values: [6]
			},
			operator: "-"
		};

		expect(DiscordMessage.rollMessage(rollObj)).to.equal("-(6)");
	});

	it("should be +(1+4+2)", () => {
		let rollObj = {
			results: {
				values: [1,4,2]
			},
			operator: "+"
		};

		expect(DiscordMessage.rollMessage(rollObj)).to.equal("+(1+4+2)");
	});

	it("should be -(1+2)", () => {
		let rollObj = {
			results: {
				values: [1,2]
			},
			operator: "-"
		};

		expect(DiscordMessage.rollMessage(rollObj)).to.equal("-(1+2)");
	});
});

describe("Advantage Message Tests", () => {
	it("should be +((20)+~~(2)~~)", () => {
		let rollObj = {
			results: {
				values: [20],
				total: 20,
				roll1: {
					values: [20],
					total: 20
				},
				roll2: {
					values: [2],
					total: 2
				}
			},
			operator: "+"
		};

		expect(DiscordMessage.advantageMessage(rollObj)).to.equal("+((20)+~~(2)~~)");
	});

	it("should be +(~~(2)~~+(20))", () => {
		let rollObj = {
			results: {
				values: [20],
				total: 20,
				roll2: {
					values: [20],
					total: 20
				},
				roll1: {
					values: [2],
					total: 2
				}
			},
			operator: "+"
		};

		expect(DiscordMessage.advantageMessage(rollObj)).to.equal("+(~~(2)~~+(20))");
	});

	it("should be +(~~(2+3)~~+(20+1))", () => {
		let rollObj = {
			results: {
				values: [20,1],
				total: 21,
				roll2: {
					values: [20,1],
					total: 21
				},
				roll1: {
					values: [2,3],
					total: 5
				}
			},
			operator: "+"
		};

		expect(DiscordMessage.advantageMessage(rollObj)).to.equal("+(~~(2+3)~~+(20+1))");
	});

	it("should be -((19+3)+~~(5+4)~~)", () => {
		let rollObj = {
			results: {
				values: [19,3],
				total: 22,
				roll1: {
					values: [19,3],
					total: 22
				},
				roll2: {
					values: [5,4],
					total: 9
				}
			},
			operator: "-"
		};

		expect(DiscordMessage.advantageMessage(rollObj)).to.equal("-((19+3)+~~(5+4)~~)");
	});
});

describe("Disadvantage Message Tests", () => {
	it("should be +(~~(20)~~+(2))", () => {
		let rollObj = {
			results: {
				values: [2],
				total: 2,
				roll1: {
					values: [20],
					total: 20
				},
				roll2: {
					values: [2],
					total: 2
				}
			},
			operator: "+"
		};

		expect(DiscordMessage.disadvantageMessage(rollObj)).to.equal("+(~~(20)~~+(2))");
	});

	it("should be +((2)+~~(20)~~)", () => {
		let rollObj = {
			results: {
				values: [2],
				total: 2,
				roll2: {
					values: [20],
					total: 20
				},
				roll1: {
					values: [2],
					total: 2
				}
			},
			operator: "+"
		};

		expect(DiscordMessage.disadvantageMessage(rollObj)).to.equal("+((2)+~~(20)~~)");
	});

	it("should be +((2+3)+~~(20+1)~~)", () => {
		let rollObj = {
			results: {
				values: [2,3],
				total: 5,
				roll2: {
					values: [20,1],
					total: 21
				},
				roll1: {
					values: [2,3],
					total: 5
				}
			},
			operator: "+"
		};

		expect(DiscordMessage.disadvantageMessage(rollObj)).to.equal("+((2+3)+~~(20+1)~~)");
	});

	it("should be -(~~(19+3)~~+(5+4))", () => {
		let rollObj = {
			results: {
				values: [5,4],
				total: 9,
				roll1: {
					values: [19,3],
					total: 22
				},
				roll2: {
					values: [5,4],
					total: 9
				}
			},
			operator: "-"
		};

		expect(DiscordMessage.disadvantageMessage(rollObj)).to.equal("-(~~(19+3)~~+(5+4))");
	});
});

describe("Keep Highest Message Tests", () => {
	it("should be +(~~2~~+20)", () => {
		let rollObj = {
			results: {
				values: [2,20]
			},
			operator: "+",
			option: "kh1"
		};

		expect(DiscordMessage.keepHighestMessage(rollObj)).to.equal("+(~~2~~+20)");
	});

	it("should be -(~~5~~+18)", () => {
		let rollObj = {
			results: {
				values: [5,18]
			},
			operator: "-",
			option: "kh1"
		};

		expect(DiscordMessage.keepHighestMessage(rollObj)).to.equal("-(~~5~~+18)");
	});

	it("should be -(~~5+7~~+18)", () => {
		let rollObj = {
			results: {
				values: [5,7,18]
			},
			operator: "-",
			option: "kh1"
		};

		expect(DiscordMessage.keepHighestMessage(rollObj)).to.equal("-(~~5+7~~+18)");
	});

	it("should be -(~~5~~+7+18)", () => {
		let rollObj = {
			results: {
				values: [5,7,18]
			},
			operator: "-",
			option: "kh2"
		};

		expect(DiscordMessage.keepHighestMessage(rollObj)).to.equal("-(~~5~~+7+18)");
	});

	it("should be -(2+5+12+20)", () => {
		let rollObj = {
			results: {
				values: [2,5,12,20]
			},
			operator: "-",
			option: "kh4"
		};

		expect(DiscordMessage.keepHighestMessage(rollObj)).to.equal("-(2+5+12+20)");
	});
});

describe("Keep Lowest Message Tests", () => {
	it("should be +(2+~~20~~)", () => {
		let rollObj = {
			results: {
				values: [2,20]
			},
			operator: "+",
			option: "kl1"
		};

		expect(DiscordMessage.keepLowestMessage(rollObj)).to.equal("+(2+~~20~~)");
	});

	it("should be -(2+~~20~~)", () => {
		let rollObj = {
			results: {
				values: [2,20]
			},
			operator: "-",
			option: "kl1"
		};

		expect(DiscordMessage.keepLowestMessage(rollObj)).to.equal("-(2+~~20~~)");
	});

	it("should be -(2+~~5+20~~)", () => {
		let rollObj = {
			results: {
				values: [2,5,20]
			},
			operator: "-",
			option: "kl1"
		};

		expect(DiscordMessage.keepLowestMessage(rollObj)).to.equal("-(2+~~5+20~~)");
	});

	it("should be -(2+~~5+12+20~~)", () => {
		let rollObj = {
			results: {
				values: [2,5,12,20]
			},
			operator: "-",
			option: "kl1"
		};

		expect(DiscordMessage.keepLowestMessage(rollObj)).to.equal("-(2+~~5+12+20~~)");
	});

	it("should be -(2+5+~~12+20~~)", () => {
		let rollObj = {
			results: {
				values: [2,5,12,20]
			},
			operator: "-",
			option: "kl2"
		};

		expect(DiscordMessage.keepLowestMessage(rollObj)).to.equal("-(2+5+~~12+20~~)");
	});

	it("should be -(2+5+12+~~20~~)", () => {
		let rollObj = {
			results: {
				values: [2,5,12,20]
			},
			operator: "-",
			option: "kl3"
		};

		expect(DiscordMessage.keepLowestMessage(rollObj)).to.equal("-(2+5+12+~~20~~)");
	});

	it("should be -(2+5+12+20)", () => {
		let rollObj = {
			results: {
				values: [2,5,12,20]
			},
			operator: "-",
			option: "kl4"
		};

		expect(DiscordMessage.keepLowestMessage(rollObj)).to.equal("-(2+5+12+20)");
	});
});

describe("Roll Dice Message Tests", () => {
	it("should be (20) = `20`", () => {
		let results = {
			rolls: [
				{
					operator: "+",
					total: 20,
					results: {
						total: 20,
						values: [20]
					}
				}
			],
			total: 20
		}
		
		expect(DiscordMessage.rollDiceMessage(results)).to.equal("(20) = `20`");
	});

	it("should be -(20) = `-20`", () => {
		let results = {
			rolls: [
				{
					operator: "-",
					total: 20,
					results: {
						total: 20,
						values: [20]
					}
				}
			],
			total: -20
		}
		
		expect(DiscordMessage.rollDiceMessage(results)).to.equal("-(20) = `-20`");
	});

	it("should be (16)+(4) = `20`", () => {
		let results = {
			rolls: [
				{
					operator: "+",
					total: 16,
					results: {
						total: 16,
						values: [16]
					},
				},
				{
					operator: "+",
					total: 4,
					results: {
						total: 4,
						values: [4]
					},
				},

			],
			total: 20
		}
		
		expect(DiscordMessage.rollDiceMessage(results)).to.equal("(16)+(4) = `20`");
	});

	it("should be (16)-(4) = `16`", () => {
		let results = {
			rolls: [
				{
					operator: "+",
					total: 16,
					results: {
						total: 16,
						values: [16]
					},
				},
				{
					operator: "-",
					total: 4,
					results: {
						total: 4,
						values: [4]
					},
				},

			],
			total: 12
		}
		
		expect(DiscordMessage.rollDiceMessage(results)).to.equal("(16)-(4) = `12`");
	});

	it("should be ((16)+~~(1)~~)+(4) = `20`", () => {
		let results = {
			rolls: [
				{
					operator: "+",
					total: 16,
					option: "a",
					results: {
						total: 16,
						values: [16],
						roll1: {
							total: 16,
							values: [16]
						},
						roll2: {
							total: 1,
							values: [1]
						}
					},
				},
				{
					operator: "+",
					total: 4,
					results: {
						total: 4,
						values: [4]
					},
				},

			],
			total: 20
		}
		
		expect(DiscordMessage.rollDiceMessage(results)).to.equal("((16)+~~(1)~~)+(4) = `20`");
	});
	
});

describe("Character Row Message Tests", () => {
	it("should be Rolls: `1,3,5,6`. Total: `14`", () => {
		let results = {
			total: 14,
			values: [1,3,5,6]
		}
		
		expect(DiscordMessage.characterRowMessage(results)).to.equal("Rolls: `1,3,5,6`. Total: `14`");
	});
	
});