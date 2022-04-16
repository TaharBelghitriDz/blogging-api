import { addUser } from "../interfaces/user.interface";
import { userDb } from "../models/user.model";
import { comparePassword } from "../utils/bcrypt";
import { tokenSign } from "../utils/token";
import { checkName, validateEmail } from "../utils/validation";

export const signUp = (
  _: any,
  { name, email, password, checkpassword }: addUser & { checkpassword: string }
) => {
  const chceckNames = checkName(name);
  if (!chceckNames) return { err: " unvalid name" };

  const checkEmail = validateEmail(email);
  if (!checkEmail) return { err: "unvalid email" };

  if (password !== checkpassword)
    return { err: "unvalid password check again" };

  return userDb
    .findOne({ $or: [{ email }, { name }] })
    .then((user) => {
      if (user)
        throw { err: (user.name === name ? "name" : "email") + " is unavlid" };
      else return;
    })
    .then(() => userDb.addUser({ name, email, password }))
    .then((user) => {
      const token = tokenSign(user._id);
      if (token) return { token: token };
      else throw { err: "somthing went wrong #2" };
    })
    .catch((err) => {
      return { err: err.err || "somthing went wrong" };
    });
};

export const login = (_: any, args: { email: string; password: string }) => {
  const checkEmail = validateEmail(args.email);
  if (!checkEmail) return { err: "unvalid email" };

  return userDb
    .findOne({ email: args.email })
    .then((user) => {
      if (!user) return { err: "unvalid email" };
      console.log("login ... " + user.password + args.password);
      return [comparePassword(args.password, user.password), user];
    })
    .then((data: any) => {
      if (!data[0]) throw { err: "unvalid password" };
      const token = tokenSign(data[1]._id);
      if (token) return { token: token };
      else throw { err: "somthing went wrong #2" };
    })
    .catch((err) => {
      return { err: err.err || "somthing went wrong" };
    });
};
