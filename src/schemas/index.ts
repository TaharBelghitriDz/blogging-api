import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import { addBlog } from "../resolvers/blog";
import { login, signUp } from "../resolvers/user";

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
    addBlog: addBlog,
  },
  Query: {
    signUp(h: any, args: any) {
      return "hi";
    },
  },
};

export default addResolversToSchema({
  schema,
  resolvers,
});
