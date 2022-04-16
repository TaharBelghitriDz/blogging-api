import { model, Schema, FilterQuery } from "mongoose";
import {
  userSchemaIntrface,
  userModleInterface,
  addUser,
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
  "validate",
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

type Query = FilterQuery<userSchemaIntrface>;

userSchema.statics.addUser = (args: addUser) => new userDb(args).save();

// remove the values you don't want to update from the object before pass it as paramss
userSchema.statics.updateProfileInfos = (
  Query: Query,
  args: userSchemaIntrface
) => userDb.findOneAndUpdate(Query, { $set: args });

// this to push all data to any array ... one method for all of them
//push data used to remove data but not in subdocs
userSchema.statics.pushData = (Query: Query, data: object) =>
  userDb.findOneAndUpdate(Query, {
    $push: data,
  });

// remove data from subdocs
userSchema.statics.pullData = (Query: Query, data: object) =>
  userDb.findOneAndUpdate(Query, {
    $pull: data,
  });

export const userDb = model<userSchemaIntrface, userModleInterface>(
  "blogUser",
  userSchema
);
