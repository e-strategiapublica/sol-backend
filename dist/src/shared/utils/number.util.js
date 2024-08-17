"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NumberUtil {
    static generateRandomNumber() {
        return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    }
    static generateRandomNumberArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}
exports.default = NumberUtil;
//# sourceMappingURL=number.util.js.map