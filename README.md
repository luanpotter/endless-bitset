# endless-bitset

[![Build Status](https://travis-ci.org/luanpotter/endless-bitset.svg?branch=master)](https://travis-ci.org/luanpotter/endless-bitset)

An endless and fast bitset with some nice methods.  

This is a wrapper around mattkrick's [fast-bitset](https://github.com/mattkrick/fast-bitset) that allows for unlimited sizes.  

It uses [big-integer](https://github.com/peterolson/BigInteger.js) to access the higher indexes (but should work with plain old JS numbers for smaller indexes).  

## Installation
 `npm install endless-bitset --save`

## Features and Limitations

It's supposed to re-implement all methods from fast-bitset (they are a good selection), but I did just the ones I needed so far.  
Technically, I guess it's limited by your RAM, your spare processing time and your call stack. But should be sufficient for most purposes.  

## API

Currently implemented are these methods from the original API:

* BitSet
  * new BitSet(nBitsOrKey) : only for integer or bitInt parameters
  * .get(idx) ⇒ <code>boolean</code>
  * .set(idx) ⇒ <code>boolean</code>
  * .unset(idx) ⇒ <code>boolean</code>
  * .setRange(from, to) ⇒ <code>boolean</code>
  * .nextUnsetBit(idx) ⇒ <code>number</code>

I also added this property:

* BitSet
  * length ⇒ <code>integer</code> : returns the max length, exactly as specified in the constructor

For the complete documentation, visit [fast-bitset](https://github.com/mattkrick/fast-bitset)'s readme.