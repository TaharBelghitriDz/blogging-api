import { model, Schema, FilterQuery } from "mongoose";
import {
  userSchemaIntrface,
  userModleInterface,
} from "../interfaces/user.interface";
import { HashPassword } from "../utils/bcrypt";

const userSchema: Schema<userSchemaIntrface> = new Schema<userSchemaIntrface>({
  name: String,
  email: String,
  password: String,
  rating: Number,
  follows: [{ usersId: String }],
  following: [{ usersId: String }],
  saved: [String],
  bio: String,
  blogs: [String],
});

userSchema.pre<userSchemaIntrface>(
  "save",
  function (this: userSchemaIntrface, next) {
    this.rating = 0;
    this.follows = [];
    this.following = [];
    this.saved = [];
    this.bio = "";
    this.blogs = [];
    HashPassword(this.password, (err, hash) => {
      if (err) throw err;
      this.password = hash;
      next();
    });
  }
);

userSchema.statics.addUser = (args: userSchemaIntrface) =>
  new userDb({ args }).save();

// remove the values you don't want to update from the object before pass it as paramss
userSchema.statics.updateProfileInfos = (
  Query: FilterQuery<userSchemaIntrface>,
  args: userSchemaIntrface
) => userDb.updateOne(Query, { $set: args });

export const userDb = model<userSchemaIntrface, userModleInterface>(
  "blogUser",
  userSchema
);
