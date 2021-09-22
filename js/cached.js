const add = (a, b) => a + b;
const objectAdd = (objA, objB) => objA.val + objB.val;

const wrapper = (func) => {
  const cache = new Map();

  const f = func;

  const isOnCache = (args) => {
    for (key of cache.keys()) {
      let isCached = true;
      for (let i = 0; i < key.length; ++i) {
        if (key[i] !== args[i]) {
          isCached = false;
        }
      }
      if (isCached) {
        return cache.get(key);
      }
    }
    return null;
  };

  return (...args) => {
    const val = isOnCache(args);
    if (val) {
      console.log("Cached: " + val);
      return val;
    }
    const result = f.apply(this, args);
    cache.set(args, result);
    console.log("Calculated: " + result);
    return result;
  };
};

const cachedAdd = wrapper(add);
const cachedObjectAdd = wrapper(objectAdd);

cachedAdd(5, 1);
cachedAdd(5, 2);
cachedAdd(5, 1);

let objA = { val: 3 };
let objB = { val: 5 };

cachedObjectAdd(objA, objB);
cachedObjectAdd(objA, { val: 5 });
cachedObjectAdd(objA, objB);
