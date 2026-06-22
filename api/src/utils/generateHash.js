import { BcryptService } from "../services/encription.js";

async function run() {
  const hash = await BcryptService.hashPassword("123456");
  console.log("HASH:", hash);
}

run();

// node src/utils/generateHash.js