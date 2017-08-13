const { expect } = require('chai');

const bigInt = require('big-integer');
const EndlessBitSet = require('../endless-bitset');

describe('EndlessBitSet', function() {
	describe('#setRange(start, end)', function() {
		it('should set a small range', function() {
			var bs = new EndlessBitSet(100);
			bs.setRange(2, 5);
			expect(bs.get(1)).to.equal(false);
			expect(bs.get(2)).to.equal(true);
			expect(bs.get(3)).to.equal(true);
			expect(bs.get(4)).to.equal(true);
			expect(bs.get(5)).to.equal(true);
			expect(bs.get(6)).to.equal(false);
		});

		it('should set a huge range', function() {
			var bs = new EndlessBitSet(bigInt(2).pow(1024));

			bs.setRange(bigInt(2).pow(256), bigInt(2).pow(256).add(1000000));

			expect(bs.get(bigInt(2).pow(256).add(-100))).to.equal(false);
			expect(bs.get(bigInt(2).pow(256).add(+100))).to.equal(true);
			expect(bs.get(bigInt(2).pow(256).add(+900000))).to.equal(true);
			expect(bs.get(bigInt(2).pow(256).add(+1100000))).to.equal(false);
		});
	});
});