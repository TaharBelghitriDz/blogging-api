import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import "./config/db.connection";
import schemas from "./schemas";
import { blogDb } from "./models/blog.model";

const app = express();
app.use(
  "/",
  graphqlHTTP({
    schema: schemas,
    graphiql: true,
  })
);

blogDb.findOneAndRemove({});
blogDb.findOne({ likes: 0 }, (e: any, r: any) => {
  console.log(r);
});
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log("server started on port " + PORT);
});
