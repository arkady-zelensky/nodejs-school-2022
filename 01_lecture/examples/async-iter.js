// Async iterator
const book = {
  'Petro': '0961234567',
  'Anna': '09612345555',
  'Mari': '09612399999',
  [Symbol.asyncIterator] () {
    var current = 0;
    return {
      keys: Object.keys(book),
      // так как метод async, результат оборачивается в промис
      async next() {
        await new Promise(res => setTimeout(res, 200 * current));
        if (current < this.keys.length) {
          return {
            done: false,
            value: this.keys[current++]
          };
        }
        return {done: true};
      }
    }
  }
};

(async () => {
  // для итерации асинк. итератора нужно использовать конструкцию
  for await (const element of book) {
    console.log(element);
  }
})()
