import { userDb } from "../../models/user.model";

export const userList = (_: any, args: string[]) => {
  const users = args.map((e) => ({ _id: e }));
  userDb
    .find({ $or: users })
    .then((users) => {
      if (!users) throw { err: "no users found" };
      return users;
    })
    .catch((err) => ({ err: err.err || "somthing went wrong" }));
};
