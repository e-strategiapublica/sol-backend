"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorsUtil = void 0;
class ValidatorsUtil {
    constructor(errors = []) {
        this.errors = errors;
        this.hasMinLen = (value, min, message) => {
            if (!value || value.length < min)
                this.errors.push(message);
        };
        this.hasMaxLen = (value, max, message) => {
            if (!value || value.length > max)
                this.errors.push(message);
        };
        this.isFixedLen = (value, len, message) => {
            if (value.length !== len)
                this.errors.push(message);
        };
        this.isEmail = (value, message) => {
            const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
            if (!reg.test(value))
                this.errors.push(message);
        };
        this.containIn = (value, enumReference, message) => {
            if (!Object.values(enumReference).includes(value))
                this.errors.push(message);
        };
        this.hasExactlyTheNumberOfDigits = (digits, value, message) => {
            let reg = new RegExp(`^[+ 0-9]{${digits}}$`);
            if (!reg.test(value.toString()))
                this.errors.push(message);
        };
        this.isSixDigitNumber = (value, message) => {
            let reg = new RegExp('^[+ 0-9]{6}$');
            if (!reg.test(value.toString()))
                this.errors.push(message);
        };
    }
    isRequired(value, message) {
        if (!value || value.length <= 0)
            this.errors.push(message);
    }
    addError(errorMessage) {
        this.errors.push(errorMessage);
    }
    clear() {
        this.errors = [];
    }
    isValid() {
        return this.errors.length === 0;
    }
}
exports.ValidatorsUtil = ValidatorsUtil;
//# sourceMappingURL=validators.util.js.map