import crypto from 'crypto';

class RSA2048Cypher {
  private originalEncoding: BufferEncoding = 'utf-8';
  private encryptedEncoding: BufferEncoding = 'base64';

  constructor(
    private publicKey: string,
    private privateKey: string,
  ) {}

  encrypt(plaintext: string) {
    return crypto.publicEncrypt(
      {
        key: this.publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // better to use padding during encryption/decryption for better security. Also padding should be the same for decryption and encryption
      },
      Buffer.from(plaintext, this.originalEncoding)
    ).toString(this.encryptedEncoding);
  }

  decrypt(encrypted: string) {
    return crypto.privateDecrypt(
      {
        key: this.privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(encrypted, this.encryptedEncoding),
    ).toString(this.originalEncoding);
  }
}

const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAwIoX/Vgix0qkAQ0HrCHMsPQgg60/GSeiFJyuXDzemg3C0rCjcnrA
X/WCtTD4/s0NUVhR87Ht3SHQca7oxtF2nJFaZlL5IO5eGqpG7BLi8rcjGyxhKAyJ
Hbvbr9t2zJoBjTD9Q2OLox90FCxqIhE9tTLG57PvdLtMXprr5+5P8agZs4H4pUML
89jUHpSXf7Oe5vwV86HaE92i8/XJDyK8Q2e5NgWapLJ2dbvj09zUrPp4VtFFP2Zm
bZr6CMUZyKOgwWT14SSQmsN455boU1CNp9VX2ibITlpbUsb5wKYB8uw2/OsxJ1Su
bkEn1G13C6cImhyyxaviIR+W1BQm8Bz+uQIDAQAB
-----END RSA PUBLIC KEY-----`;

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAwIoX/Vgix0qkAQ0HrCHMsPQgg60/GSeiFJyuXDzemg3C0rCj
cnrAX/WCtTD4/s0NUVhR87Ht3SHQca7oxtF2nJFaZlL5IO5eGqpG7BLi8rcjGyxh
KAyJHbvbr9t2zJoBjTD9Q2OLox90FCxqIhE9tTLG57PvdLtMXprr5+5P8agZs4H4
pUML89jUHpSXf7Oe5vwV86HaE92i8/XJDyK8Q2e5NgWapLJ2dbvj09zUrPp4VtFF
P2ZmbZr6CMUZyKOgwWT14SSQmsN455boU1CNp9VX2ibITlpbUsb5wKYB8uw2/Osx
J1SubkEn1G13C6cImhyyxaviIR+W1BQm8Bz+uQIDAQABAoIBABpGvl9k19o65Yb/
MDzdoAHGT2mpCyNztTr65xDPfdGobx4x3RyShA6UgvIXbOPZOCgR1Z1cewniw3/A
TyRTEczsSVoNmNJVtaIN+v/c0/wr4i6jL983Vr8oFCM74Eqr+eo69VVtEHGCqWTX
auSbVcCU3XBhrhxQM2v12JweeeqQucZiZVOAIduinaJpI5lWIGfHmZyk15CrdR8I
1FGcFb4HGTNULmgJaeg9ee3TFahoMDh122kHp3zaNBoAFj8tNG4odjqvUMII40P6
rzBCFqSdimuci79KGFt0VG3wc6kRwmx/3WdzMDadmu3Ext7NYqt5+P+S5ukq9phc
/hWWgAECgYEA6NlvWa3Y+QgrHF5LEHA57UiSWScxyuu1XY/gZQ2D2FL1c1u2WQSV
Gi8B6ytAjMs6MeFXiMOW+jOXlMrX26nHehv5EypfC2qi3MFVvba+Cq7aFW5avlUi
UagSZOTd8o1BZEYf6SNOs/fSf3Kv2u1am3FUGu9ibYMPcQzTPCRIL7kCgYEA066t
E5PhcsFrDFR4+8UB4yNzUJkwvXtrbO7nf6SkoilS7LW/aDPP6NKmrMWMJwmnwaG5
SDGIbI46yAqD55ZJ9VG0HiilIrAUjSBcGHAdE38LUNBZVpJ37vI9+RZCv3CA0dkT
Wwpq9+Rnvn8O/no6ENsGv2gJJ8rju2+uL2qcxwECgYAxOd6Xh/BJ3Zc3nRujcwZc
Cq6d2HJnYuNpz0PyOSQ5dHhdlfL76MMY0P1H2VIBMemwp+IYkLj3VjbihuuRjdgV
EZrbmWaUhEu//cOBowOUQJjsVPMsL9Vci/qvh88AOyqq50RRxlwaIfdHaFiTIQC5
wgC03Qzi+AUosjxqB4WXSQKBgA3Hbwi5NZGsuXUiAoYQ+uB4LEdw0VVkNUfv/S23
3+eWXQl/gygbR0tWevcAHPFllX/rMQ5b+w9l6rmexZtLkyDe4qSb7LPnVk8hbh1B
HwNn36qxBT+3ZQsuxY3zPwELJ7eBM9tXQENGoOIrjyRNfH4gY74N3ZqzgENxL5ty
iyYBAoGAHF44s0eF68ZjKyTvxmXcPafNOl9LLal6U3aUE+loivbW/mO/1oOd7An/
zUW49ea4gBvAsef7Ia6SQhLP9gxGcwcZaQ1ALJ6fuO56JDB7l0DdQ4zwT9iyqEwU
TSzusHB1b8zRtGWmvH114s/3s8N33y/iiRM3QYeWNni7c05RECo=
-----END RSA PRIVATE KEY-----`;

const cipher = new RSA2048Cypher(publicKey, privateKey);

const plaintext = "this is a plain text";

const encryptedText = cipher.encrypt(plaintext);
console.log('encryptedText', encryptedText);

const decryptedText = cipher.decrypt(encryptedText);
console.log('decryptedText', decryptedText);

console.log('is decrypted and original text equal? ->', plaintext === decryptedText);
