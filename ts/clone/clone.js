const deepClone = (obj) => {
    if (typeof obj !== "object")
        return obj;
    if (Array.isArray(obj)) {
        const clone = [];
        for (const arrayMember of obj) {
            clone.push(deepClone(arrayMember));
        }
        return clone;
    }
    const objKeys = Object.keys(obj);
    let clone = Object.assign({}, obj);
    clone = objKeys.reduce((result, key) => {
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
let clone2 = deepClone(arrayWithFunc);
console.log(clone2);
clone2[2]();
let clone3 = deepClone(primitiveNumber);
console.log(clone3);
const b = clone3 + 5;
console.log(b);
//# sourceMappingURL=clone.js.map