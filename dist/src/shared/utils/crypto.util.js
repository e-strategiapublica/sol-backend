"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class CryptoUtil {
    static encrypt(key, textToEncrypt) {
        return CryptoJS.AES.encrypt(textToEncrypt, key).toString();
    }
    static decrypt(key, textToDecrypt) {
        const bytes = CryptoJS.AES.decrypt(textToDecrypt, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
exports.default = CryptoUtil;
//# sourceMappingURL=crypto.util.js.map