const add = (a, b) => a + b;
const objectAdd = (objA, objB) => objA.val + objB.val;

const wrapper = (func) => {
  const cachedArguments = new Map();
  const cache = new Map();

  let currentCacheId = 0;

  return (...args) => {
    args.forEach((argument) => {
      if (!cachedArguments.has(argument)) {
        cachedArguments.set(argument, currentCacheId.toString());
        currentCacheId++;
      }
    });
    const cachedToken = args
      .map((argument) => cachedArguments.get(argument))
      .join("");

    if (cache.has(cachedToken)) {
      console.log("Cached: " + cache.get(cachedToken));
      return cache.get(cachedToken);
    }

    const result = func.apply(this, args);
    cache.set(cachedToken, result);
    console.log("Calculated: " + result);
    return result;
  };
};

const cachedAdd = wrapper(add);
const cachedObjectAdd = wrapper(objectAdd);

console.log("5, 1 =>");
cachedAdd(5, 1);
console.log("5, 2 =>");
cachedAdd(5, 2);
console.log("5, 1 =>");
cachedAdd(5, 1);

let objA = { val: 3 };
let objB = { val: 5 };
let objC = { val: 5 };

console.log("A, B =>");
cachedObjectAdd(objA, objB);
console.log("A, {} =>");
cachedObjectAdd(objA, { val: 5 });
console.log("A, B =>");
cachedObjectAdd(objA, objB);
console.log("B, A =>");
cachedObjectAdd(objB, objA);
console.log("A, C =>");
cachedObjectAdd(objA, objC);
console.log("A, C =>");
cachedObjectAdd(objA, objC);
