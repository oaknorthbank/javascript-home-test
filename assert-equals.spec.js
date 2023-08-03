/* eslint-disable no-sparse-arrays */
const assertEquals = require('./assert-equals');

const complexObject1 = {
  propA: 1,
  propB: {
    propA: [1, { propA: 'a', propB: 'b' }, 3],
    propB: 1,
    propC: 2,
  },
};

const complexObject1Copy = {
  propA: 1,
  propB: {
    propA: [1, { propA: 'a', propB: 'b' }, 3],
    propB: 1,
    propC: 2,
  },
};

const complexObject2 = {
  propA: 1,
  propB: {
    propB: 1,
    propA: [1, { propA: 'a', propB: 'c' }, 3],
    propC: 2,
  },
};

const complexObject3 = {
  propA: 1,
  propB: {
    propA: [1, { propA: 'a', propB: 'b' }, 3],
    propB: 1,
  },
};
describe('assertEquals', () => {
  describe('When expected and actual are the same string:', () => {
    it('Returns without throwing an error.', () => {
      expect(() => assertEquals('abc', 'abc')).not.toThrow();
      expect(assertEquals('abc', 'abc')).toBe('No error.');
      expect(() => assertEquals(1, 1)).not.toThrow();
      expect(assertEquals(1, 1)).toBe('No error.');
    });
    it('Removes whitespaces.', () => {
      expect(() => assertEquals('abc', ' abc  ')).not.toThrow();
      expect(assertEquals('abc', ' abc  ')).toBe('No error.');
    });
    it('Performs a case-insensitive string comparison.', () => {
      expect(() => assertEquals('abc', 'ABC')).not.toThrow();
      expect(assertEquals('abc', 'ABC')).toBe('No error.');
    });
  });

  describe('When expected and actual are different strings:', () => {
    it('Throws an error when strings are not the same.', () => {
      expect(() => assertEquals('abc', 'acd')).toThrow(
        'Expected abc but found acd'
      );
      expect(() => assertEquals(1, 2)).toThrow('Expected 1 but found 2.');
    });
    it('Thows descriptive error when actual is an empty string.', () => {
      expect(() => assertEquals('a', '')).toThrow(
        'Expected a but found an empty string.'
      );
    });
    it('Thows an error when string is too long, e.g.: >30 characters', () => {
      expect(() =>
        assertEquals('hello', 'helloooooooooooooooooooooooooooooo')
      ).toThrow('String exceeds length limit (max. 30 characters).');
    });
  });

  describe('When expected and actual are different data types:', () => {
    it('Throws an error when indicating the internal Class property.', () => {
      expect(() => assertEquals('a,b,c', ['a', 'b', 'c'])).toThrow(
        'Expected string but found array.'
      );
    });
    expect(() => assertEquals(1, '1')).toThrow(
      'Expected number but found string.'
    );
  });

  describe('When expected and actual are the same array:', () => {
    it('Returns without throwing an error.', () => {
      expect(() =>
        assertEquals(['a', 'b', 'c'], ['a', 'b', 'c'])
      ).not.toThrow();
      expect(assertEquals(['a', 'b', 'c'], ['a', 'b', 'c'])).toBe('No error.');
    });
    it('Performs a case-insensitive array comparison.', () => {
      expect(() =>
        assertEquals(['North', 'Oak', 'Bank'], ['NORTH', 'oak', 'BANK'])
      ).not.toThrow();
      expect(
        assertEquals(['North', 'Oak', 'Bank'], ['NORTH', 'oak', 'BANK'])
      ).toBe('No error.');
    });
    it('Handles arrays of numbers.', () => {
      expect(() => assertEquals([1, 2, 3], [1, 2, 3])).not.toThrow();
      expect(assertEquals([1, 2, 3], [1, 2, 3])).toBe('No error.');
    });
    it('Handles arrays of numbers and strings.', () => {
      expect(() => assertEquals([1, 2, 'a'], [1, 2, 'a'])).not.toThrow();
      expect(assertEquals([1, 2, 'a'], [1, 2, 'a'])).toBe('No error.');
    });
    it('Empty slots are not considered.', () => {
      expect(() =>
        assertEquals(['a', 'b', 'c'], [, , 'a', , 'b', , 'c', ,])
      ).not.toThrow();
      expect(assertEquals(['a', 'b', 'c'], [, , 'a', , 'b', , 'c', ,])).toBe(
        'No error.'
      );
    });
    it('Strings within arrays with whitespaces pass the test.', () => {
      expect(() =>
        assertEquals(['a', 'b', 'c'], ['a', '  b', 'c  '])
      ).not.toThrow();
      expect(assertEquals(['a', 'b', 'c'], ['a', '  b', 'c  '])).toBe(
        'No error.'
      );
      expect(assertEquals(['a', 'b', 'c'], ['a', '  b', 'c  '])).toBe(
        'No error.'
      );
    });
  });

  describe('When expected and actual are different arrays:', () => {
    it('Throws an error when arrays have different length.', () => {
      expect(() => assertEquals(['a', 'b'], ['a', 'b', 'c'])).toThrow(
        'Expected array length 2 but found 3.'
      );
    });
    it('Throws an error when items in the array are different.', () => {
      expect(() => assertEquals(['a', 'b', 'c'], ['a', 'c', 'c'])).toThrow(
        'Expected b at index 1 but found c.'
      );
    });
    it('Handles correct error when item in array is of different type.', () => {
      expect(() => assertEquals([1, 2, 3], [1, '2', 3])).toThrow(
        'Expected number at index 1 but found string.'
      );
    });
  });

  describe('it handles objects', () => {
    it('Returns without an error when objects are the same.', () => {
      expect(() =>
        assertEquals(complexObject1, complexObject1Copy)
      ).not.toThrow();
      expect(assertEquals(complexObject1, complexObject1Copy)).toBe(
        'No error.'
      );
    });
    it('Compares the values types and returns without an error', () => {
      expect(() =>
        assertEquals(complexObject1, complexObject1Copy)
      ).not.toThrow();
      expect(assertEquals(complexObject1, complexObject1Copy)).toBe(
        'No error.'
      );
    });

    it("Throws an error when object's  keys do not match", () => {
      expect(() => assertEquals({ a: 'a' }, { b: 'b' })).toThrow(
        'Expected key a but not found.'
      );
    });
    it("Throws an error when object's values do not match", () => {
      expect(() => assertEquals(complexObject1, complexObject2)).toThrow(
        'Properties propB do not match.'
      );
    });
  });
});
