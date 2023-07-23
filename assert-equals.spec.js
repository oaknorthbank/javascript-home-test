/* eslint-disable no-sparse-arrays */
const assertEquals = require('./assert-equals');

describe('assertEquals', () => {
  describe('When expected and actual are the same string:', () => {
    it('Returns without throwing an error.', () => {
      expect(() => assertEquals('abc', 'abc')).not.toThrow();
      expect(() => assertEquals(1, 1)).not.toThrow();
    });
    it('Removes whitespaces.', () => {
      expect(() => assertEquals('abc', ' abc  ')).not.toThrow();
    });
    it('Performs a case-insensitive string comparison.', () => {
      expect(() => assertEquals('abc', 'ABC')).not.toThrow();
    });
  });

  describe('When expected and actual are different strings:', () => {
    it('Throws an error when strings are not the same.', () => {
      expect(() => assertEquals('abc', 'acd')).toThrow();
      expect(() => assertEquals(1, 2)).toThrow();
      expect(() => assertEquals(1, '1')).toThrow();
    });
    it('Thows descriptive error when actual is an empty string.', () => {
      expect(() => assertEquals('a', '')).toThrow();
    });
    it('Thows an error when string is too long, e.g.: >30 characters', () => {
      expect(() =>
        assertEquals('hello', 'helloooooooooooooooooooooooooooooo')
      ).toThrow();
    });
  });

  describe('When expected and actual are different data types:', () => {
    it('Throws an error when indicating the internal Class property.', () => {
      expect(() => assertEquals('a,b,c', ['a', 'b', 'c'])).toThrow();
    });
  });

  describe('When expected and actual are the same array:', () => {
    it('Returns without throwing an error.', () => {
      expect(() =>
        assertEquals(['a', 'b', 'c'], ['a', 'b', 'c'])
      ).not.toThrow();
    });
    it('Performs a case-insensitive array comparison.', () => {
      expect(() =>
        assertEquals(['North', 'Oak', 'Bank'], ['NORTH', 'oak', 'BANK'])
      ).not.toThrow();
    });
    it('Handles arrays of numbers.', () => {
      expect(() => assertEquals([1, 2, 3], [1, 2, 3])).not.toThrow();
    });
    it('Handles arrays of numbers and strings.', () => {
      expect(() => assertEquals([1, 2, 'a'], [1, 2, 'a'])).not.toThrow();
    });
    it('Empty slots are not considered.', () => {
      expect(() =>
        assertEquals(['a', 'b', 'c'], [, , 'a', , 'b', , 'c', ,])
      ).not.toThrow();
    });
    it('Strings within arrays with whitespaces pass the test.', () => {
      expect(() =>
        assertEquals(['a', 'b', 'c'][('a', '  b', 'c  ')])
      ).not.toThrow();
    });
  });

  describe('When expected and actual are different arrays:', () => {
    it('Throws an error when arrays have different length.', () => {
      expect(() => assertEquals(['a', 'b'], ['a', 'b', 'c'])).toThrow();
    });
    it('Throws an error when items in the array are different.', () => {
      expect(() => assertEquals(['a', 'b', 'c'], ['a', 'c', 'c'])).toThrow();
    });
    it('Handles correct error when item in array is of different type.', () => {
      expect(() => assertEquals([1, 2, 3], [1, '2', 3])).toThrow();
    });
  });
});
