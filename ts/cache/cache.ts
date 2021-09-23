const shitCalculation = (
  value: number, 
  array: number[], 
  object: {value: number}, 
  shitObject: {value: number, array: number[]}
  ): number => {
  return (
    value +
    array.reduce((result, item) => result + item, 0) +
    object.value +
    shitObject.array.reduce(
      (result, item) => result + item * shitObject.value
    )
  );
};

const wrapper = <T extends any[], CacheType>(func: (...args: T) => CacheType) => {
  const cachedArguments = new Map<any,string>();
  const cachedObjects = new WeakMap<object,string>();

  const cache = new Map<string,CacheType>();

  let currentCacheId = 0;

  return (...args: T): CacheType => {
    args.forEach((argument: any) => {
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
      console.log("Cached Value");
      return cache.get(cachedToken) as CacheType;
    }

    const result = func.apply(null, args) as CacheType;
    cache.set(cachedToken, result);
    console.log("Calculated Value");
    return result;
  };
};

const cachedShitCalculation = wrapper(shitCalculation);

let val = 1;
let array = [1, 2, 3];
let object = { value: 5 };
let shitObject = { value: 3, array: [1, 2, 3] };
let shitObject2 = { value: 3, array: [1, 1, 3] };

cachedShitCalculation(val, array, object, shitObject);
cachedShitCalculation(val, array, object, shitObject);
cachedShitCalculation(val, array, object, shitObject2);