const add = (a, b) => a + b;
const objectAdd = (objA, objB) => objA.val + objB.val;

const shitCalculation = (value, array, object, shitObject) => {
  return (
    value +
    array.reduce((result, item) => result + item, 0) +
    object.value +
    shitObject.array.reduce((result, item) => result + item * shitObject.value)
  );
};

const wrapper = (func) => {
  const cachedArguments = new Map();
  const cachedObjects = new WeakMap();

  const cache = new Map();

  let currentCacheId = 0;

  return (...args) => {
    args.forEach((argument) => {
      if (cachedObjects.has(argument) || cachedArguments.has(argument)) return;
      currentCacheId++;
      if (typeof argument === "object") {
        cachedObjects.set(argument, currentCacheId.toString());
        return;
      }
      cachedArguments.set(argument, currentCacheId.toString());
    });

    const cachedToken = args
      .map((argument) =>
        typeof argument === "object"
          ? cachedObjects.get(argument)
          : cachedArguments.get(argument)
      )
      .join("#");

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
const cachedShitCalculation = wrapper(shitCalculation);

// console.log("5, 1 =>");
// cachedAdd(5, 1);
// console.log("5, 2 =>");
// cachedAdd(5, 2);
// console.log("5, 1 =>");
// cachedAdd(5, 1);

// let objA = { val: 3 };
// let objB = { val: 5 };
// let objC = { val: 5 };

// console.log("A, B =>");
// cachedObjectAdd(objA, objB);
// console.log("A, {} =>");
// cachedObjectAdd(objA, { val: 5 });
// console.log("A, B =>");
// cachedObjectAdd(objA, objB);
// console.log("B, A =>");
// cachedObjectAdd(objB, objA);
// console.log("A, C =>");
// cachedObjectAdd(objA, objC);
// console.log("A, C =>");
// cachedObjectAdd(objA, objC);

let val = 1;
let array = [1, 2, 3];
let object = { value: 5 };
let shitObject = { value: 3, array: [1, 2, 3] };
let shitObject2 = { value: 3, array: [1, 1, 3] };
cachedShitCalculation(val, array, object, shitObject);
cachedShitCalculation(val, array, object, shitObject);
cachedShitCalculation(val, array, object, shitObject2);
