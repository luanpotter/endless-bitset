const BitSet = require('fast-bitset');
const bigInt = require('big-integer');

const MAX = bigInt(2).pow(32);

const log = (a, b) => {
	let count = 0;
	while (a.gt(b)) {
		a = a.divide(b);
		count++;
	}
	return count;
};

const normalize = n => typeof n === 'number' ? bigInt(n) : n;

const EndlessBitSet = class {
	constructor(length) {
		this.length = normalize(length);
		this.depth = log(this.length, MAX);
		this.buckets = [];
	}

	getBucket(i) {
		if (!this.buckets[i]) {
			this.buckets[i] = this.depth === 0 ? new BitSet(MAX.valueOf()) : new EndlessBitSet(this.length.divide(MAX));
		}
		return this.buckets[i];
	}

	set(idxParam) {
		const idx = normalize(idxParam);

		const i = idx.divide(MAX);
		const r = idx.mod(MAX);

		this.getBucket(i).set(r);
	}

	get(idxParam) {
		const idx = normalize(idxParam);

		const i = idx.divide(MAX);
		const r = idx.mod(MAX);

		return this.getBucket(i).get(r);
	}

	nextUnsetBit(idxParam) {
		const idx = normalize(idxParam);

		const i = idx.divide(MAX);
		const r = idx.mod(MAX);

		let bucket = this.getBucket(i);
		let bit = bucket.nextUnsetBit(r);
		if (bit !== -1) {
			return bit;
		}

		while (i < MAX) {
			bucket = this.getBucket(++i);
			bit = bucket.nextUnsetBit(0);
			if (bit !== -1) {
				return bit;
			}
		}

		return -1;
	}
};

module.exports = EndlessBitSet;