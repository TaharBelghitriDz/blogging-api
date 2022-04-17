import { userDb } from "../../models/user.model";

export const userList = (_: any, args: string[]) => {
  const users = args.map((e) => ({ _id: e }));
  userDb.find({ $or: users });
};
