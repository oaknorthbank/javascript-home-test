function trimAndLowerCase(input) {
  if (getType(input) === 'string') {
    return input.trim().toLowerCase();
  }
  if (getType(input) === 'array') {
    return input.map((item) => {
      if (getType(item) === 'string') {
        return item.trim().toLowerCase();
      }
      return item;
    });
  }
}

function getType(input) {
  const result = Object.prototype.toString.call(input);
  switch (result) {
    case '[object Array]':
      return 'array';
    case '[object String]':
      return 'string';
    case '[object Number]':
      return 'number';
    case '[object Object]':
      return 'object';
    case '[object Function]':
      return 'function';
    case '[object Boolean]':
      return 'boolean';
    default:
      return 'unknown';
  }
}

function objectLength(obj) {
  return Object.keys(obj).length;
}
function keysSortedToString(obj) {
  return Object.keys(obj).sort().toString();
}

function valuesSortedBykeys(obj) {
  return JSON.stringify(
    Object.entries(obj)
      .sort()
      .map(([, value]) => value)
  );
}
module.exports = {
  trimAndLowerCase,
  getType,
  objectLength,
  keysSortedToString,
  valuesSortedBykeys,
};
