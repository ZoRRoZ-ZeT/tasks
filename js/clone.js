const deepClone = (obj) => {
  if (typeof obj !== "object") return obj;

  let clone = Object.assign({}, obj);
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  clone = Object.keys(obj).reduce((result, key) => {
    const copiedKey = result;
    copiedKey[key] = deepClone(obj[key]);
    return copiedKey;
  }, {});

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
      func() {
        console.log("3 level func = " + this.val_one);
      },
    },
    func() {
      console.log("2 level func = " + this.val_one[1]);
    },
  },
  func() {
    console.log("1 level func = " + this.val_one);
  },
};
const arrayWithFunc = [
  1,
  3,
  () => {
    console.log(4);
  },
];
const primitiveNumber = 17;

let clone = deepClone(obj);
clone.obj.val_one[1] = 100;
console.log(clone); // 1, 2, ['Hi', 100...
clone.func();
clone.obj.func();
obj.obj.func();
clone.obj.obj.func();

clone = deepClone(arrayWithFunc);
console.log(clone);
clone[2]();

clone = deepClone(primitiveNumber);
console.log(clone);
const b = clone + 5;
console.log(b);
