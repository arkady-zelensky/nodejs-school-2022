import crypto from 'crypto';

class AES256Cypher {
  private key: Buffer;
  private iv: Buffer;

  constructor(key: string, iv: string) {
    this.key = Buffer.from(key, 'base64');
    this.iv = Buffer.from(iv, 'base64');
  }

  encrypt(plaintext: string) {
    let cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
    let encrypted = cipher.update(plaintext, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  decrypt(encrypted: string) {
    let decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

const cipher = new AES256Cypher('FLlenXadPOpgiyBps9VjvuYdjwG6lgq5nGJSg2dZSnw=','ewLJP1g24mW5t802V0DK/A==');

const plaintext = "this is a plaintext";

const encryptedText = cipher.encrypt(plaintext);
console.log('encryptedText ------>>>>>', encryptedText);

const decryptedText = cipher.decrypt(encryptedText);
console.log('decryptedText ------>>>>>', decryptedText);

console.log('is decrypted and original text equal? ->', plaintext === decryptedText);
