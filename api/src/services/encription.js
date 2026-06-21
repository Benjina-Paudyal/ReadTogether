import bcrypt from "bcrypt";

export const BcryptService = {
  async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },

  async hashPassword(password, saltRounds = 10) {
    return bcrypt.hash(password, saltRounds);
  },
};