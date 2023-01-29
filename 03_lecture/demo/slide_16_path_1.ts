import * as path from 'path';

console.log(__dirname);
console.log(__filename);

// only file name
console.log('basename ----->>>>', path.basename(__filename));

// full directory path
console.log('dirname ----->>>>', path.dirname(__filename));

// file extension
console.log('extname ----->>>>', path.extname(__filename));

// path object
console.log('parse ----->>>>', path.parse(__filename));

// concatenate path
console.log('join ----->>>>', path.join(__dirname, 'folder', 'even-more-folder', 'hello.html'));


// More examples



// get the path delimiter base on the current OS Environment
const platSpec = path.sep;

console.log('----->>>>', platSpec);
