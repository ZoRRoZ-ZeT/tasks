const deepClone = <Type>(obj: Type): Type => {
  if (typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    const clone = [] as any[];
    for (const arrayMember of obj as any as any[]) {
      clone.push(deepClone(arrayMember))
    }
    return clone as any as Type;
  }
  const objKeys = Object.keys(obj);
  let clone = Object.assign({},obj) as { [key: string]: any };
  clone = objKeys.reduce((result: { [key: string]: any }, key: string) => {
    const copiedKey = result;
    copiedKey[key] = deepClone(obj[key]);
    return copiedKey;
  }, {});

  return clone as Type;
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

let clone2 = deepClone(arrayWithFunc);
console.log(clone2);
(clone2[2] as () => void)();

let clone3 = deepClone(primitiveNumber);
console.log(clone3);
const b = clone3 + 5;
console.log(b);
