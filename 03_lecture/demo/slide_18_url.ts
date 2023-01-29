import * as url from 'url'

// const myUrl = new URL('https://github.com/arkady-zelensky/nodejs-school-2021/branches/all?query=lesson_4');
const myUrl = new url.URL('https://github.com/arkady-zelensky/nodejs-school-2021/branches/all?query=lesson_4');

console.log('myUrl ------->>>>>', myUrl);
// Serialized URL
console.log('host ------->>>>>', myUrl.host);

// Host (root domain)
console.log('host ------->>>>>', myUrl.host);

// Host without port
console.log('hostname ------->>>>>', myUrl.hostname);

// Pathname
console.log('pathname ------->>>>>', myUrl.pathname);

// Serialized query
console.log('search ------->>>>>', myUrl.search);

// Params object
console.log('searchParams ------->>>>>', myUrl.searchParams);

// Add param
myUrl.searchParams.append('status', 'stale');
console.log('searchParams ------->>>>>', myUrl.searchParams);

console.log('url', myUrl.href);

const myURL = new URL('https://example.org');
myURL.pathname = '/a/b/c';
myURL.search = '?d=e';
myURL.hash = '#fgh';
console.log('href ------->>>>>', myURL.href)


// console.log(process.env);