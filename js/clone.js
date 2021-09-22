const deepClone = (obj) => {
  let clone = Object.keys(obj).reduce((result, key) => {
    result[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
    return result;
  }, {});
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

const obj = {
  val_one: 1,
  val_two: 2,
  obj: {
    val_one: ["Hi", 1, { val_one: 3 }],
    val_two: 3,
    obj: {
      val_one: 2,
      val_two: 1,
    },
  },
};
const clone = deepClone(obj);
clone.obj.val_one[1] = 100;

console.log(obj); // 1, 2, ['Hi', 1...
console.log(clone); // 1, 2, ['Hi', 100...
