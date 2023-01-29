import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import argon2 from 'argon2';

class HashingExamples {
  getCryptoSHA256Hash(plaintextToHash: string, salt: string) {
    return crypto
      .createHash('sha256')
      .update(plaintextToHash + salt)
      .digest('hex');
  }

  async getBcryptHash(plaintextToHash: string) {
    const salt = '$2a$06$3205Y4U5sbGmgxWl3UvVYO';
    console.log(salt);
    return bcrypt.hash(plaintextToHash, salt);
  }

  async bcryptCompare(originalText: string, hash: string) {
    return bcrypt.compare(originalText, hash);
  }
  
  getArgon2Hash(plaintextToHash: string, salt: string) {
    return argon2.hash(plaintextToHash, { raw: false, salt: Buffer.from(salt) })
  }

  
  getCryptoHmacHash(plaintextToHash: string, secret: string) {
    return crypto
    .createHmac('sha256', secret)
    .update(plaintextToHash)
    .digest('hex');
  }
  
  getArgon2HmacHash(plaintextToHash: string, secret: string) {
    return argon2.hash(plaintextToHash, { raw: false, secret: Buffer.from(secret) })
  }
}

(async function() {
  const examples = new HashingExamples();
  console.log(await examples.getCryptoHmacHash("plaintext", "$2a$06$3205Y4U5sbGmgxWl3UvVYOBtMtomm7qAOYhOkjd6s7GlpSfcz7Emq"));
}())
