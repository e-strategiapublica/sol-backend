import * as bcrypt from "bcryptjs";
export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 13);
};
