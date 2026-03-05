import { ValidatorsUtil } from "./validators.util";

describe("ValidatorsUtil - CNPJ Validation", () => {
  let validator: ValidatorsUtil;

  beforeEach(() => {
    validator = new ValidatorsUtil();
  });

  it("should NOT add error for valid old CNPJ (numeric)", () => {
    // Exemplo válido: 12.345.678/0001-95
    const validOldCnpj = "12345678000195";
    validator.isRequired(validOldCnpj, "CNPJ obrigatório");
    validator.hasMinLen(validOldCnpj, 14, "CNPJ deve ter 14 caracteres");
    validator.hasMaxLen(validOldCnpj, 14, "CNPJ deve ter 14 caracteres");
    expect(validator.errors.length).toBe(0);
  });

  it("should add error for invalid old CNPJ (numeric, wrong length)", () => {
    const invalidOldCnpj = "123456789001"; // 12 chars
    validator.isRequired(invalidOldCnpj, "CNPJ obrigatório");
    validator.hasMinLen(invalidOldCnpj, 14, "CNPJ deve ter 14 caracteres");
    validator.hasMaxLen(invalidOldCnpj, 14, "CNPJ deve ter 14 caracteres");
    expect(validator.errors).toContain("CNPJ deve ter 14 caracteres");
  });

  it("should NOT add error for valid new CNPJ (alfanumerico)", () => {
    // Exemplo válido: 7CGDWINCSLG877
    const validNewCnpj = "7CGDWINCSLG877";
    validator.isRequired(validNewCnpj, "CNPJ obrigatório");
    validator.hasMinLen(validNewCnpj, 14, "CNPJ deve ter 14 caracteres");
    validator.hasMaxLen(validNewCnpj, 14, "CNPJ deve ter 14 caracteres");
    expect(validator.errors.length).toBe(0);
  });

  it("should add error for invalid new CNPJ (alfanumerico, wrong length)", () => {
    const invalidNewCnpj = "7CGDWINCSLG87"; // 13 chars
    validator.isRequired(invalidNewCnpj, "CNPJ obrigatório");
    validator.hasMinLen(invalidNewCnpj, 14, "CNPJ deve ter 14 caracteres");
    validator.hasMaxLen(invalidNewCnpj, 14, "CNPJ deve ter 14 caracteres");
    expect(validator.errors).toContain("CNPJ deve ter 14 caracteres");
  });
});
