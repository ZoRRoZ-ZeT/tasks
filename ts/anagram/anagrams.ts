const areAnagramsTs = (firstString: string, secondString: string): boolean => {
  const firstValue = firstString.toLowerCase().split("").sort().join("");
  const secondValue = secondString.toLowerCase().split("").sort().join("");

  return firstValue === secondValue;
}

console.log(areAnagramsTs("Hello", "olleH")); // true
console.log(areAnagramsTs("Value", "Valua")); // false
console.log(areAnagramsTs("Hello World!", "Well holord!")); // true

