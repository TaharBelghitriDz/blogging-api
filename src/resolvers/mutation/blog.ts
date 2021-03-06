import { addBlogPrms, addComment } from "../../interfaces/blog.schema";
import { blogDb } from "../../models/blog.model";
import { userDb } from "../../models/user.model";

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

export const editBLog = (
  _: any,
  { args }: { args: addBlogPrms & { id: string } }
) => {
  blogDb
    .findOne({ $and: [{ title: args.title }, { _id: args.id }] })
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

export const removeBlog = (args: { userId: string; blogId: string }) =>
  blogDb
    .deleteOne({ $and: [{ _id: args.blogId }, { ownerId: args.userId }] })
    .then((removed) => {
      if (!removed) throw { err: "somthing wrong happend #5" };
      return { msg: "removed" };
    })
    .catch((err) => ({ err: err.err || "somthing went wrong" }));

export const addComments = (_: any, { args }: { args: addComment }) =>
  userDb
    .findOne({ _id: args.id })
    .then((user) => {
      if (!user) throw { err: "unvalid user id" };
      return user;
    })
    .then((user) =>
      blogDb.pushData(
        { _id: args.blogId },
        { comment: { name: user.name, content: args.content, likes: [] } }
      )
    )
    .then((pushed) => {
      if (!pushed) throw { err: "somthing wrong happend #1" };
      return { msg: "posted" };
    })
    .catch((err) => ({ err: err.err || "somthing went wrong" }));

export const editCommnet = (
  _: any,
  { args }: { args: addComment & { commentId: string } }
) =>
  blogDb
    .findOneAndUpdate(
      {
        _id: args.blogId,
        "comment.$._id": args.commentId,
      },
      { $set: { "comment.$.content": args.content } }
    )
    .then((update) => {
      if (!update) throw { err: "somrthing wrong happend" };
      return { msg: "posted" };
    })
    .catch((err) => ({ err: err.err || "somthing went wrong" }));

export const removeComment = (
  _: any,
  args: { blogId: string; userId: string; commentId: string }
) =>
  blogDb
    .pullData(
      { _id: args.blogId },
      { comment: { ownerId: args.userId, _id: args.commentId } }
    )
    .then((removed) => {
      if (!removed) throw { err: "somthing wrong happend #5" };
      return { msg: "removed" };
    })
    .catch((err) => ({ err: err.err || "somthing went wrong" }));
