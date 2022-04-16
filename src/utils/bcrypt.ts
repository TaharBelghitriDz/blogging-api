import { hash, genSalt, compareSync } from "bcryptjs";

export const comparePassword = (str: string, str2: string) =>
  compareSync(str, str2);

const saltRounds = 8;

export const HashPassword = (
  str: string,
  clb: (err: Error | undefined, hash: string) => void //hash(str, 8, clb);
) =>
  genSalt(8, function (err, salt) {
    if (err) throw err;
    return hash(str, salt, clb);
  });
