import { addUser } from "../interfaces/user.interface";
import { userDb } from "../models/user.model";
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
