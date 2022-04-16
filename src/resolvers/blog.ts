import { addBlogPrms } from "../interfaces/blog.schema";
import { blogDb } from "../models/blog.model";

export const addBlog = (_: any, { args }: { args: addBlogPrms }) => {
  return blogDb
    .findOne({ title: args.title })
    .then((data) => {
      console.log(data);
      if (data) throw { err: "unvalid title " };
      return;
    })
    .then(() => blogDb.addBlog(args))
    .then(() => {
      return { msg: "blog added" };
    })
    .catch((err) => {
      return { err: err.err || "somthing went wrong" };
    });
};

export const editBLog = (_: any, args: addBlogPrms & { id: string }) => {
  blogDb
    .findOne({ $or: [{ title: args.title }, { _id: args.id }] })
    .then((data) => {
      if (!data) throw { err: "somthing wrong happend" };
      if (data) {
        if (data.title === args.title) throw { err: "unvalid title" };
        return data;
      }
    })
    .then((data: any) => blogDb.editBlog({ _id: data.id }, args))
    .finally(() => ({ data: "blog added" }))
    .catch((err) => ({ err: err.err || "somthing went wrong" }));
};