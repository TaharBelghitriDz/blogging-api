import { Document, Model, FilterQuery } from "mongoose";

type Query = FilterQuery<blogInterface>;

export interface blogInterface extends Document {
  ownerId: string;
  title: string;
  content: string;
  likes?: number;
  comment?: { name: string; content: string; likes: number }[];
  tags?: string[];
}

export interface blogModelInterface extends Model<blogInterface> {
  addBlog: (args: blogInterface) => Promise<blogInterface>;
  editBlog: (Query: Query, args: blogInterface) => Promise<blogInterface>;
  pushData: (Query: Query, data: object) => Promise<blogInterface>;
}
