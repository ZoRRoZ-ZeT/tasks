const areAnagrams = (firstString, secondString) => {
  const firstValue = firstString.toLowerCase().split("").sort().join("");
  const secondValue = secondString.toLowerCase().split("").sort().join("");

  return firstValue === secondValue;
};

console.log(areAnagrams("Hello", "olleH")); // true
console.log(areAnagrams("Value", "Valua")); // false
console.log(areAnagrams("Hello World!", "Well holord!")); // true
