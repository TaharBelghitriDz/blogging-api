import { Document, Model, FilterQuery } from "mongoose";

export interface userSchemaIntrface extends Document {
  name: string;
  email: string;
  password: string;
  rating?: number;
  blogs?: string[];
  follows?: { userId: string }[];
  following?: { userId: string }[];
  saved?: string[];
  bio?: string;
}

export interface userModleInterface extends Model<userSchemaIntrface> {
  addUser: (args: userSchemaIntrface) => Promise<userSchemaIntrface>;
  updateProfileInfos: (
    Query: FilterQuery<userSchemaIntrface>,
    args: userSchemaIntrface
  ) => Promise<userSchemaIntrface>;
}
