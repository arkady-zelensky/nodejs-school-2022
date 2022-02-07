function showExamples() {

  // "this"
  let user = {
    _name: "John",
    age: 30,
    sayHi() {
      console.log("Hi, " + this._name + "!");
    }
  };
  user.sayHi();
  // split getting object method and its call in different rows
  let hi = user.sayHi;
  hi();


  // IIFE
  (function() {
    var car = {
      velocity: 80,
      color: 'white',
      model: 'm3'
    };
    console.log('Hello from IIFE');
  })();


  // Closures
  let name = "Petro";
  function sayHi() {
    console.log("Hi, " + name);
  }
  name = "Vasil";
  sayHi(); // Petro or Vasil ?

  function makeWorker() {
    let position = "Developer";
    return function() {
      console.log("I'm " + position);
    };
  }
  let position = "Manager";
  // create a function
  let work = makeWorker();
  // call it
  work(); // Developer or Manager ?



  // Iterator
  const book = {
    'Petro': '0961234567',
    'Anna': '09612345555',
    'Mari': '09612399999',
    [Symbol.iterator] () {
      var current = 0;
      return {
        // current: 0,
        keys: Object.keys(book),
        next() {
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

  for (const element of book) {
    console.log(element);
  }
}

showExamples();
