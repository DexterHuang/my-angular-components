import * as CryptoJS from "crypto-js";
export class CryptoHelper {
  static encrypt(text: string, password: string) {
    const encrypted = CryptoJS.AES.encrypt(text, password).toString();
    return encrypted;
  }
  static decrypt(text: string, password: string) {
    const decrypted = CryptoJS.AES.decrypt(text, password).toString(
      CryptoJS.enc.Utf8
    );
    return decrypted;
  }
  static encryptObject(obj: Object, password: string) {
    return this.encrypt(JSON.stringify(obj), password);
  }
  static decryptObject(text: string, password) {
    const json = this.decrypt(text, password);
    return JSON.parse(json);
  }
}
