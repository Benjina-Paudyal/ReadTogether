import bcrypt from "bcrypt";

export async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function hashPassword(password, saltRounds = 10) {
  return bcrypt.hash(password, saltRounds);
}