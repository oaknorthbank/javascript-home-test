/* eslint-disable no-plusplus */
const {
  trimAndLowerCase,
  getType,
  objectLength,
  keysSortedToString,
  valuesSortedBykeys,
} = require('./utils.js');

function assertEquals(expect, actual) {
  // handles strings
  if (typeof expect === 'string' && typeof actual === 'string') {
    if (actual === '') {
      throw new Error(`Expected ${expect} but found an empty string.`);
    }
    if (actual.length > '30') {
      throw new Error(`String exceeds length limit (max. 30 characters).`);
    }
    if (trimAndLowerCase(expect) !== trimAndLowerCase(actual)) {
      throw new Error(`Expected ${expect} but found ${actual}.`);
    }
    return 'No error.';
  }

  // handles numbers
  if (typeof expect === 'number' && typeof actual === 'number') {
    if (expect !== actual) {
      throw new Error(`Expected ${expect} but found ${actual}.`);
    }
    return 'No error.';
  }

  // handles different data types
  if (getType(expect) !== getType(actual)) {
    throw new Error(
      `Expected ${getType(expect)} but found ${getType(actual)}.`
    );
  }

  // handles arrays
  if (Array.isArray(expect) && Array.isArray(actual)) {
    const expectCleaned = trimAndLowerCase(expect);
    const actualCleaned = trimAndLowerCase(actual).filter(
      (item) => item !== undefined
    );

    // handles non-matching lengths of array
    if (expect.length !== actualCleaned.length) {
      throw new Error(
        `Expected array length ${expect.length} but found ${actualCleaned.length}.`
      );
    }
    // handles different types of entries in array
    for (let i = 0; i < expect.length; i++) {
      if (getType(expect[i]) !== getType(actualCleaned[i])) {
        throw new Error(
          `Expected ${getType(expect[i])} at index ${actualCleaned.indexOf(
            actualCleaned[i]
          )} but found ${getType(actualCleaned[i])}.`
        );
      }
      // handles non-mathcing entries in array
      if (expectCleaned[i] !== actualCleaned[i]) {
        throw new Error(
          `Expected ${expect[i]} at index ${actualCleaned.indexOf(
            actualCleaned[i]
          )} but found ${actualCleaned[i]}.`
        );
      }
    }
    // handles matching arrays
    return 'No error.';
  }

  if (getType(expect) === 'object' && getType(actual) === 'object') {
    if (objectLength(expect) !== objectLength(actual)) {
      throw new Error(
        `expected ${getType(expect)} properties but found ${objectLength(
          actual
        )}`
      );
    }
    if (keysSortedToString(expect) !== keysSortedToString(actual)) {
      for (const key in expect) {
        if (!(key in actual)) {
          throw new Error(`Expected key ${key} but not found.`);
        }
      }
    }
    if (valuesSortedBykeys(expect) !== valuesSortedBykeys(actual)) {
      for (const key in expect) {
        if (JSON.stringify(expect[key]) !== JSON.stringify(actual[key])) {
          throw new Error(`Properties ${key} do not match.`);
        }
      }
    }

    return 'No error.';
  }
}

module.exports = assertEquals;
