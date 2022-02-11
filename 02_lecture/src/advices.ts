// specify type as much precisely as possible
const marks = {
  low : 1,
  average : 2,
  good : 3,
  better : 4,
  best : 5
} as const;

type Mark = typeof marks[keyof typeof marks];

const userMark: Mark = 2;
// const userMark3: Mark = 10;




// -------------------------------------------
// limit generics with extends keyword

type Organization = {
  name: string;
  address: string;
}

// type company = Organization & {phone: string;};

function leaveOrganizations<T extends Organization>(organizations: T[]): void {
  organizations.forEach(o => console.log(`I leave ${o.name} at ${o.address}`));
}

leaveOrganizations([{name: 'UFC', address: 'Vokzalna 1'}, {name: "MacDonalnds", address: 'Shevchenko 2'}]);
// leaveOrganizations([{name: 'UFC', address: 'Vokzalna 1'}, {name: "MacDonalnds", address: 'Shevchenko 2', some: 5}]);



// -------------------------------------------
// use type inference, the simpler the code - the better
const bookTitle1 = 'Life of Pi' as any as number;
const bookTitle2 = 'The Hobbit';
// bookTitle1.toUpperCase();
// bookTitle1.




// -------------------------------------------
// don't use any, use unknown instead
function logResponseError(response: any) {
  console.log(response.error);
}

type APIResponse = { status: number, error?: string};
function logResponseError2(response: APIResponse) {
  console.log(response?.error || 'no error message');
}
const apiResponse: unknown = JSON.parse('{"status":400,"error":"Missing required parameter"}');
// logResponseError(apiResponse);
logResponseError2(apiResponse as APIResponse);




// -------------------------------------------
// use readonly for immutability
class Fish {
  constructor(public readonly name: string) {}
}

function logResponseError3(response: Readonly<APIResponse>) {
  console.log(response?.error || 'no error message');
  // response.error = null;
}
