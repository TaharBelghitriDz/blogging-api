import { model, Schema, FilterQuery } from "mongoose";
import { blogInterface, blogModelInterface } from "../interfaces/blog.schema";

const blogSchema = new Schema<blogInterface>({
  title: String,
  ownerId: String,
  content: String,
  likes: Number,
  comment: [{ name: String, content: String, likes: Number }],
  tags: [String],
});

blogSchema.pre<blogInterface>("save", function (this: blogInterface, next) {
  this.likes = 0;
  this.comment = [];
  this.tags = [];
  next();
});

type Query = FilterQuery<blogInterface>;

blogSchema.statics.addBlog = (args: blogInterface) => new blogDb(args).save();

// remove the values you don't want to update from the object before pass it as paramss

blogSchema.statics.edit = (Query: Query, args: blogInterface) =>
  blogDb.findOneAndUpdate(Query, { $set: args });

// this to push all data to any array ... one method for all of them
//push data used to remove data but not in subdocs
blogSchema.statics.pushData = (Query: Query, data: object) =>
  blogDb.findOneAndUpdate(Query, {
    $push: data,
  });

// remove data from subdocs
blogSchema.statics.pullData = (Query: Query, data: object) =>
  blogDb.findOneAndUpdate(Query, {
    $pull: data,
  });

export const blogDb = model<blogInterface, blogModelInterface>(
  "blog",
  blogSchema
);
