// 2. Write a function-wrapper, that will cache the result of any other function.

const wrapper = (func) => {
    const cache = {};

    return (...args) => {
        const key = [...args].join("");

        if(cache[key]) return cache[key];

        cache[key] = func(...args);
        return cache[key];
    };
};

// TEST
const add = (a, b) => a + b;
const cachedAdd = wrapper(add);

console.log(cachedAdd(2,2)); // 4 calculated
console.log(cachedAdd(5,8)); // 13 calculated
console.log(cachedAdd(2,2)); // 4 from cache
console.log(cachedAdd(2,2)); // 4 from cache