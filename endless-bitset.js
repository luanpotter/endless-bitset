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

	max() {
		return MAX.pow(this.depth + 1);
	}

	getBucket(iParam) {
		const i = iParam.valueOf();
		if (!this.buckets[i]) {
			this.buckets[i] = this.depth === 0 ? new BitSet(MAX.valueOf()) : new EndlessBitSet(this.length.divide(MAX));
		}
		return this.buckets[i];
	}

	set(idxParam) {
		return this._findOp('set', idxParam);
	}

	unset(idxParam) {
		return this._findOp('unset', idxParam);
	}

	get(idxParam) {
		return this._findOp('get', idxParam);
	}

	_findOp(op, idxParam) {
		const idx = normalize(idxParam);

		const i = idx.divide(this.max());
		const r = idx.mod(this.max());

		return this.getBucket(i)[op](r);
	}

	setRange(startParam, endParam) {
		const startIdx = normalize(startParam);
		const endIdx = normalize(endParam);

		const start = startIdx.divide(this.max());
		const end = endIdx.divide(this.max());

		const startR = startIdx.mod(this.max());
		const endR = endIdx.mod(this.max());

		if (start.eq(end)) {
			this.getBucket(start).setRange(startR, endR);
		} else {
			this.getBucket(start).setRange(startR, this.max());
			for (let i = start.add(1); i.lt(end); i = i.next()) {
				this.getBucket(i).setRange(0, this.max());
			}
			this.getBucket(end).setRange(0, endR);
		}
	}

	nextUnsetBit(idxParam) {
		const idx = normalize(idxParam);

		const i = idx.divide(this.max());
		const r = idx.mod(this.max());

		let bucket = this.getBucket(i);
		let bit = bucket.nextUnsetBit(r);
		if (bit !== -1) {
			return bit;
		}

		while (i < this.max()) {
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