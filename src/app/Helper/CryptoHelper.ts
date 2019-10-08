import * as crypto from "crypto";
import * as CryptoJS from "crypto-js";
export class CryptoHelper {
  // static encrypt(text: string, password: string) {
  //   var cipher = crypto.createCipher("aes-256-ctr", password);
  //   var crypted = cipher.update(text, "utf8", "hex");
  //   crypted += cipher.final("hex");
  //   return crypted;
  // }
  // static decrypt(text: string, password: string) {
  //   var decipher = crypto.createDecipher("aes-256-ctr", password);
  //   var dec = decipher.update(text, "hex", "utf8");
  //   dec += decipher.final("utf8");
  //   return dec;
  // }
  static encrypt(text: string, password: string) {
    const encrypted = CryptoJS.AES.encrypt(text, password);
    return encrypted;
  }
  static decrypt(text: string, password: string) {
    var decipher = crypto.createDecipher("aes-256-ctr", password);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  }
}

console.log("hi");
