/* eslint-disable no-plusplus */
function assertEquals(expect, actual) {
  // handles strings
  if (typeof expect === 'string' && typeof actual === 'string') {
    if (actual === '') {
      throw new Error(`expected ${expect} but found an empty string`);
    }
    if (actual.length > '30') {
      throw new Error(`String exceeds length limit (max. 30 characters)`);
    }
    if (expect !== actual.toLowerCase().trim()) {
      throw new Error(`expected ${expect} but found ${actual.trim()}`);
    }
    return 'No error';
  }

  // handles numbers
  if (typeof expect === 'number' && typeof actual === 'number') {
    if (expect !== actual) {
      throw new Error(`expected ${expect} but found ${actual}`);
    }
    return 'No error';
  }

  // handles different data types
  if (typeof expect !== typeof actual) {
    throw new Error(
      `Expected type ${typeof expect} but found type ${Object.prototype.toString.call(
        actual
      )}`
    );
  }

  // handles arrays
  if (Array.isArray(expect) && Array.isArray(actual)) {
    const actualFiltered = actual
      .map((item) => {
        if (typeof item === 'string') {
          return item.trim().toLowerCase();
        }
        return item;
      })
      .filter((item) => item !== undefined);

    const expectCaseInsensitive = expect.map((item) => {
      if (typeof item === 'string') {
        return item.toLowerCase();
      }
      return item;
    });
    // handles non-matching lengths of array
    if (expect.length !== actualFiltered.length) {
      throw new Error(
        `expected array length ${expect.length} but found ${actualFiltered.length}`
      );
    }
    // handles different types of entries in array
    for (let i = 0; i < expect.length; i++) {
      if (typeof expect[i] !== typeof actualFiltered[i]) {
        throw new Error(
          `expected ${typeof expect[i]} at index ${
            actualFiltered[i]
          }, but found ${typeof actualFiltered[i]}`
        );
      }
      // handles non-mathcing entries in array
      if (expectCaseInsensitive[i] !== actualFiltered[i]) {
        throw new Error(
          `expected ${expect[i]} at index ${actualFiltered.indexOf(
            actualFiltered[i]
          )}, but found ${actualFiltered[i]}`
        );
      }
    }
    // handles matching arrays
    return 'No error';
  }
}

module.exports = assertEquals;
