export declare class ValidatorsUtil {
    errors: any[];
    constructor(errors?: any[]);
    isRequired(value: any, message: any): void;
    hasMinLen: (value: any, min: any, message: any) => void;
    hasMaxLen: (value: any, max: any, message: any) => void;
    isFixedLen: (value: any, len: any, message: any) => void;
    isEmail: (value: any, message: any) => void;
    containIn: (value: any, enumReference: any, message: any) => void;
    hasExactlyTheNumberOfDigits: (digits: number, value: number, message: string) => void;
    isSixDigitNumber: (value: number, message: string) => void;
    addError(errorMessage: string): void;
    clear(): void;
    isValid(): boolean;
}
