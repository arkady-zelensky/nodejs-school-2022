// 1. Write the clone function so that it can clone deeply the object passed as a parameter.

const cloneObj = (obj) => ({ ...obj });

// TEST
const obj = {
    a: 0,
    b: "00"
};

const obj2 = cloneObj(obj);

console.log("\tInitial objects");
console.log("Object1: ", obj);
console.log("Object2: ", obj2);

obj.a = 1;
obj.b = "10";
obj2.a = 2
obj2.b = "20";

console.log("\n\tModified objects");
console.log("Object1: ", obj);
console.log("Object2: ", obj2);