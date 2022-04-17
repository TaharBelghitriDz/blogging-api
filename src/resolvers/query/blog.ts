import { blogDb } from "../../models/blog.model";

export const getBLog = (_: any, args: { blogId: string }) =>
  blogDb
    .findOne({ _id: args.blogId })
    .then((blog) => {
      if (!blog) throw { err: "somthing wrogn happend" };
      return blog;
    })
    .catch((err) => ({ err: err.err || "somthing went wrong" }));

export const getListBLog = (_: any, args: { blogId: string[] }) => {
  const blogs = args.blogId.map((e) => ({ _id: e }));

  return blogDb
    .findOne({ $or: blogs })
    .then((blog) => {
      if (!blog) throw { err: "somthing wrogn happend" };
      return blog;
    })
    .catch((err) => ({ err: err.err || "somthing went wrong" }));
};
