import "./config/db.connection";
import { join } from "path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { login, signUp } from "./resolvers/user";

// Load schema from the file
const schema = loadSchemaSync(
  join(__dirname, "./schemas/mutation/index.graphql"),
  {
    loaders: [new GraphQLFileLoader()],
  }
);

// Write some resolvers
const resolvers = {
  Mutation: {
    signUp,
    login,
  },
  Query: {
    signUp(h: any, args: any) {
      return "hi";
    },
  },
};

// Add resolvers to the schema
const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const app = express();
app.use(
  "/",
  graphqlHTTP({
    schema: schemaWithResolvers,
    graphiql: true,
  })
);
app.listen(4000, () => {
  console.log("server started on port 4000");
});
