// 3. Create a function `searchSerial`, which takes two parameters: 
//    1 - an array of string or numeric values, 
//    2 - searched value. 
// The function should return a number - maximum count of serial entries of the given value.

const searchSerial = (arr, val) => {
    if(!Array.isArray(arr)) throw new Error("searchSerial() - first parameter must be an array");
    if(!arr.includes(val)) return 0;

    let maxCount = 0;
    let counter = 0;

    for(const i in arr){
        if(arr[i] === val) counter++;
        if(arr[i] !== val || +i === arr.length - 1) {
            if(counter > maxCount) maxCount = counter;
            counter = 0;
        }
    }

    return maxCount;
}

// TEST
// 0: 3  //  1: 4
const numArr = [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1];
// a: 2  //  b: 5
const strArr = ["a", "b", "b", "b", "a", "a", "b", "b", "b", "b", "b"];

const numVal = 0;
const strVal = "a";

const numMaxCount = searchSerial(numArr, numVal);
const strMaxCount = searchSerial(strArr, strVal);

console.log(`Max Count for "${numVal}": `, numMaxCount);
console.log(`Max Count for "${strVal}": `, strMaxCount);