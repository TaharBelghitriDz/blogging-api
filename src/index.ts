import "./config/db.connection";
import { join } from "path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { login, signUp } from "./resolvers/user";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

import { userDb } from "./models/user.model";

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

// userDb.find({ email: "gitnawi0@gmail.com" }, (err) => {
//   console.log(err);
// });

const app = express();
app.use(
  "/",
  graphqlHTTP({
    schema: schemaWithResolvers,
    graphiql: true,
  })
);
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
