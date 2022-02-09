// 0. Write function, which takes two strings, and returns true if they are anagrams of one another.
function isAnagram(
  a: string,
  b: string,
): boolean {
  const cast = (_: string): string => Array.from(_).sort().join('');
  return cast(a) === cast(b);
}

console.log('Task 0:');
[
  ['a', 'a'],
  ['aa', 'aaa'],
  ['aba', 'baa'],
  ['aaa', 'abb'],
].forEach(([a, b]) => console.log(`"${a}"`, 'and', `"${b}"`, isAnagram(a, b) ? 'are' : 'are not', 'an anagrams'));

// 1. Write the clone function so that it can clone deeply the object passed as a parameter.
function cloneDeep(
  a: any,
): any {
  return JSON.parse(JSON.stringify(a));
}

console.log('Task 1:');
console.log(cloneDeep({
  a: [1, 2, 3],
  b: {
    bb: 2,
    bbb: 3,
    c: new Date,
  },
}));

// 2. Write a function-wrapper, that will cache the result of any other function.
//    Look at the example of use case in pseudocode:
//    ```js
//    const add = (a, b) => a+b;
//    const wrapper = (args) => {
//      // implementation
//    };
//    const cachedAdd = wrapper(add);
//    cachedAdd(2,2); // 4 calculated
//    cachedAdd(5,8); // 13 calculated
//    cachedAdd(2,2); // 4 from cache
//    ```
function wrapper(
  act: Function,
): Function {
  const cache = new Map();
  return function (..._) {
    const key = JSON.stringify(_);
    if (cache.has(key)) {
      return cache.get(key);
    } else {
      const value = act(..._);
      cache.set(key, value);
      return value;
    }
  }
}
const add = (a, b) => {
  console.log('add', a, b);
  return a+b;
}
const cachedAdd = wrapper(add);
console.log('Task 2:');
console.log(2, 2, cachedAdd(2, 2)); // 4 calculated
console.log(5, 8, cachedAdd(5, 8)); // 13 calculated
console.log(2, 2, cachedAdd(2, 2)); // 4 from cache

// 3. Create a function `searchSerial`, which takes two parameters: 
// 1 - an array of string or numeric values, 
// 2 - searched value. The function should return a number - maximum count of serial entries of the given value.
function searchSerial(
  scope: Array<number | string>,
  value: number | string,
): number {
  const serial: string | undefined = scope
    .map(_ => +Object.is(_, value))
    .join('')
    .split(/0+/)
    .sort()
    .pop();
  return serial ? serial.length : null;
}

console.log('Task 4:');
[
  [],
  [ 1, 1,1,0,0,0,1,1,1,0,0,1,1 ],
].forEach(([v, ...s]) => console.log(s, '|', v, '|', searchSerial(s, v)));
