import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import { login, signUp } from "../resolvers/mutation/user";
import {
  addBlog,
  addComments,
  editBLog,
  editCommnet,
  removeBlog,
  removeComment,
} from "../resolvers/mutation/blog";
import { getUserInfo, userList } from "../resolvers/query/user";
import { getBLog, getComments, getListBLog } from "../resolvers/query/blog";

const schema = loadSchemaSync(
  [join(__dirname, "./mutation.graphql"), join(__dirname, "./query.graphql")],
  {
    loaders: [new GraphQLFileLoader()],
  }
);

const resolvers = {
  Mutation: {
    signUp,
    login,
    addBlog,
    addComments,
    editBLog,
    editCommnet,
    removeBlog,
    removeComment,
  },
  Query: {
    getUserInfo,
    userList,
    getBLog,
    getListBLog,
    getComments,
  },
};

export default addResolversToSchema({
  schema,
  resolvers,
});
