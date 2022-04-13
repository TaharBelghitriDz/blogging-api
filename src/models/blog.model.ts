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

blogSchema.statics.addBlog = (args: blogInterface) => new blogDb(args).save();

// remove the values you don't want to update from the object before pass it as paramss
blogSchema.statics.edit = (
  Query: FilterQuery<blogInterface>,
  args: blogInterface
) => blogDb.updateOne(Query, { $set: args });

export const blogDb = model<blogInterface, blogModelInterface>(
  "blog",
  blogSchema
);
