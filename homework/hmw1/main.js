const anogram = (firstSt, secondSt) => {
  return (
    firstSt.length === secondSt.length ||
    firstSt.split ('').sort ().join ('') ===
      firstSt.split ('').sort ().join ('')
  );
};

function clone (obj) {
  if (typeof obj === 'object' && obj !== null) {
    let cloneObject = Array.isArray (obj) ? [] : {};
    let map = new Map ();
    if (map.get (obj)) {
      return map.get (obj);
    }
    map.set (obj, cloneObject);
    for (const key in obj) {
      cloneObject[key] = clone (obj[key]);
    }
    return cloneObject;
  } else {
    return obj;
  }
}

const wrapper = args => {
  const cache = new Map ();
  return (...val) => {
    const key = val.join ('-');

    if (cache.has (key)) {
      console.log ('has');
      return cache.get (key);
    }
    console.log ('no');
    cache.set (key, args (...val));
    return cache.get (key);
  };
};

const searchSerial = (arr, val) => {
  let count = 0;
  let max = count;
  for (const el of arr) {
    if (el === val) {
      count++;
    } else {
      max = max < count ? count : max;
      count = 0;
    }
  }
  max = max < count ? count : max;
  return max;
};
