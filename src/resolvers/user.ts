import { addUser } from "../interfaces/user.interface";
import { userDb } from "../models/user.model";
import { comparePassword, HashPassword } from "../utils/bcrypt";
import { validateEmail } from "../utils/validation";

export const signUp = (
  _: any,
  { name, email, password, checkpassword }: addUser & { checkpassword: string }
) => {
  //check email
  const checkEmail = validateEmail(email);
  if (!checkEmail) return { err: "unvalid email" };

  // check password
  if (password !== checkpassword)
    return { err: "unvalid password check again" };
  return userDb
    .addUser({ name, email, password })
    .then(() => {
      return { token: "token" };
    })
    .catch(() => {
      return { err: "err" };
    });
};

export const login = (_: any, args: { email: string; password: string }) => {
  //check email
  const checkEmail = validateEmail(args.email);
  if (!checkEmail) return { err: "unvalid email" };

  return userDb
    .findOne({ email: args.email })
    .then((user) => {
      if (user) return { err: "unvalid emai" };
      comparePassword(args.password, user.password, (err, result) => {
        if (err) return { err: "somthng went wrong" };
        else if (!result) return { err: "unvalid password" };
        else return { token: "token" };
      });
    })
    .catch((err) => {
      if (err.err) return { err: err.err };
      else return { err: "somthing went wrong" };
    });
};
