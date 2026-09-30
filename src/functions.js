export function unique(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }

  return [...new Set(arr)];
}

export function groupBy(arr, keyFn) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }

  return arr.reduce((groups, item) => {
    const key = keyFn(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
    return groups;
  }, {});
}

export function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }

  if (size <= 0) {
    throw new Error("Size must be greater than 0");
  }

  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      deepClone(value)
    ])
  );
}

export function memoize(fn) {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
}

export function counter(start = 0) {
  let value = start;

  return {
    inc() {
      value++;
      return value;
    },

    dec() {
      value--;
      return value;
    },

    value() {
      return value;
    }
  };
}
