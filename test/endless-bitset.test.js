const { expect } = require('chai');

const bigInt = require('big-integer');
const EndlessBitSet = require('../endless-bitset');

describe('EndlessBitSet', function() {
	describe('#get(), #set(i)', function() {
		it('should set a bit and get it', function() {
			const set = new EndlessBitSet(10);

			set.set(1);

			expect(set.get(0)).to.equal(false);
			expect(set.get(1)).to.equal(true);
			expect(set.get(2)).to.equal(false);
		});

		it('should set a range of bits and get all of them', function() {
			const set = new EndlessBitSet(2000);

			set.set(1);
			set.set(11);
			set.set(101);
			set.set(999);
			set.set(1001);

			expect(set.get(0)).to.equal(false);
			expect(set.get(1)).to.equal(true);
			expect(set.get(2)).to.equal(false);

			expect(set.get(10)).to.equal(false);
			expect(set.get(11)).to.equal(true);
			expect(set.get(12)).to.equal(false);

			expect(set.get(100)).to.equal(false);
			expect(set.get(101)).to.equal(true);
			expect(set.get(102)).to.equal(false);

			expect(set.get(998)).to.equal(false);
			expect(set.get(999)).to.equal(true);
			expect(set.get(1000)).to.equal(false);
			expect(set.get(1001)).to.equal(true);
			expect(set.get(1002)).to.equal(false);
		});

		it('should work with huge numbers', function() {
			const set = new EndlessBitSet(bigInt('100000000000000000000000000000000000'));

			set.set(bigInt('20000000000000000000000000000137'));

			expect(set.get(bigInt('20000000000000000000000000000136'))).to.equal(false);
			expect(set.get(bigInt('20000000000000000000000000000137'))).to.equal(true);
			expect(set.get(bigInt('20000000000000000000000000000138'))).to.equal(false);
		});

		it('should work with any numbers', function() {
			const set = new EndlessBitSet(bigInt(2).pow(1024));

			const n1 = bigInt(2).pow(120), n2 = bigInt(2).pow(547).add(1234);
			set.set(n1);
			set.set(n2);

			expect(set.get(n1.add(-1))).to.equal(false);
			expect(set.get(n1)).to.equal(true);
			expect(set.get(n1.add(+1))).to.equal(false);

			expect(set.get(n2.add(-1))).to.equal(false);
			expect(set.get(n2)).to.equal(true);
			expect(set.get(n2.add(+1))).to.equal(false);
		});
	});
});