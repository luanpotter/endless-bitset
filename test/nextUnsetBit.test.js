const { expect } = require('chai');

const bigInt = require('big-integer');
const EndlessBitSet = require('../endless-bitset');

describe('EndlessBitSet', function() {
	describe('#nextUnsetBit(i)', function() {
		it('should find next unset bit in the same word', function() {
			var bs = new EndlessBitSet(100);
			bs.setRange(10, 30);
			expect(bs.nextUnsetBit(1)).to.equal(1);
		});

		it('should find next set bit the next word', function() {
			var bs = new EndlessBitSet(100);
			bs.setRange(10, 30);
			expect(bs.nextUnsetBit(11)).to.equal(31);
		});
	});
});