import * as CryptoJS from "crypto-js";

export default class CryptoUtil {
  static encrypt(key: string, textToEncrypt: string): string {
    return CryptoJS.AES.encrypt(textToEncrypt, key).toString();
  }

  static decrypt(key: string, textToDecrypt: string): any {
    const bytes = CryptoJS.AES.decrypt(textToDecrypt, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  static calculateHash(data: Record<string, any>): string {
    return (
      "0x" + CryptoJS.SHA256(JSON.stringify(data)).toString(CryptoJS.enc.Hex)
    );
  }
}
