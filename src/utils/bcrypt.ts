import { compare, hash, genSalt } from "bcryptjs";

export const comparePassword = (
  str: string,
  str2: string,
  clb: (err: Error | undefined, rslt: boolean) => void
) => compare(str, str2, clb);

const saltRounds = 8;

export const HashPassword = (
  str: string,
  clb: (err: Error | undefined, hash: string) => void //hash(str, 8, clb);
) =>
  genSalt(8, function (err, salt) {
    return hash("password", salt, clb);
  });
