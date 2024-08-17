"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BooleanUtil {
    static getBoolean(value) {
        switch (value) {
            case true:
            case "true":
            case 1:
            case "1":
            case "on":
            case "yes":
                return true;
            default:
                return false;
        }
    }
}
exports.default = BooleanUtil;
//# sourceMappingURL=boolean.util.js.map