import crypto from 'crypto';

export class CryptoClass {
    private ENCRYPT_SECRET = process.env.ENCRYPT_SECRET as string;
    private algorithm = 'aes-256-ctr';
    private key_bytes = Buffer.from(this.ENCRYPT_SECRET, 'base64');
    private ENCRYPTION_KEY = crypto.createHash('sha256').update(String(this.key_bytes)).digest('base64').substr(0, 32);
    private IV_LENGTH = 16;

    public encryptRequest = (text: any) => {
        let iv = crypto.randomBytes(this.IV_LENGTH);
        let cipher = crypto.createCipheriv(this.algorithm, String(this.ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    public decryptRequest = (text: any) => {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv(this.algorithm, String(this.ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

}


// const ENCRYPT_SECRET = process.env.ENCRYPT_SECRET as string;

// const algorithm = 'aes-256-ctr';

// // const secret = "billonapp_platform_secret_key";
// const key_bytes = Buffer.from(ENCRYPT_SECRET, 'base64');
// let ENCRYPTION_KEY = crypto.createHash('sha256').update(String(key_bytes)).digest('base64').substr(0, 32);
// const IV_LENGTH = 16;

// export const encryptRequest = (text: any) => {
//     let iv = crypto.randomBytes(IV_LENGTH);
//     let cipher = crypto.createCipheriv(algorithm, String(ENCRYPTION_KEY), iv);
//     // const cipher = crypto.createCipheriv('aes-256-ctr', key_in_bytes, iv);
//     let encrypted = cipher.update(text);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     return iv.toString('hex') + ':' + encrypted.toString('hex');
// }

// export const decryptRequest = (text: any) => {
//     let textParts = text.split(':');
//     let iv = Buffer.from(textParts.shift(), 'hex');
//     let encryptedText = Buffer.from(textParts.join(':'), 'hex');
//     let decipher = crypto.createDecipheriv(algorithm, String(ENCRYPTION_KEY), iv);
//     let decrypted = decipher.update(encryptedText);
//     decrypted = Buffer.concat([decrypted, decipher.final()]);
//     return decrypted.toString();
// }
