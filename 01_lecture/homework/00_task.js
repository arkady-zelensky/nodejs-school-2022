// 0. Write function, which takes two strings, and returns true if they are anagrams of one another.

const areAnagram = (str1, str2) => {
    const str1f = str1.toLocaleLowerCase().split("").sort().join("");
    const str2f = str2.toLocaleLowerCase().split("").sort().join("");

    return str1f === str2f;
}

// TEST
console.log("boRk and Korb: ", areAnagram("boRk", "Korb")); // true
console.log("Bark and ball: ", areAnagram("Bark", "ball")); // false
console.log("tamE and meTa: ", areAnagram("tamE", "meTa")); // true