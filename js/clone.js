const deepClone = (obj) => {
  const clone = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object") {
      clone[key] = deepClone(value);
    } else {
      clone[key] = value;
    }
  });
  return clone;
};
const obj = {
  val_one: 1,
  val_two: 2,
  obj: {
    val_one: 1,
    val_two: 3,
    obj: {
      val_one: 2,
      val_two: 1,
    },
  },
};
const clone = deepClone(obj);
clone.obj.val_one = 100;

console.log(obj); // 1, 2, 1, 3...
console.log(clone); // 1, 2, 100, 3...
