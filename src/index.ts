import express, { Request } from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schemas";
import "./config/db.connection";

var app = express();
app.use(
  "/",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: ({ req }: { req: Request }) => {
      const token = req.headers.token;
    },
  })
);

app.listen(4000, () => {
  console.log("server started on port 4000");
});
