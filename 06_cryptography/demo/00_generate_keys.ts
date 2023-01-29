import crypto from 'crypto';

// generate AES-256 keys
const key = crypto.randomBytes(32).toString('base64');
const iv = crypto.randomBytes(16).toString('base64');

console.log('symm key ------->>>>>>', key);
console.log('symm iv ------->>>>>>', iv);

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	// The standard secure default length for RSA keys is 2048 bits
	modulusLength: 2048,
});

const publicKeyString = publicKey.export({ 
  type: "pkcs1", // padding type
	format: "pem",
});

const privateKeyString = privateKey.export({ 
  type: "pkcs1", // padding type
	format: "pem",
});

console.log('publicKey -------->>>>>>', publicKeyString);
console.log('privateKey -------->>>>>', privateKeyString);
