import { Document, Model, FilterQuery } from "mongoose";

type Query = FilterQuery<blogInterface>;

export interface blogInterface extends Document {
  ownerId: string;
  title: string;
  content: string;
  likes?: number;
  cover: string;
  comment?: { name: string; content: string; likes: number }[];
  tags?: string[];
}

export interface addBlogPrms {
  title: string;
  content: string;
  cover: string;
}

export interface addComment {
  id: string;
  blogId: string;
  content: string;
}

export interface blogModelInterface extends Model<blogInterface> {
  addBlog: (args: addBlogPrms) => Promise<blogInterface>;
  editBlog: (Query: Query, args: addBlogPrms) => Promise<blogInterface>;
  pushData: (Query: Query, data: object) => Promise<blogInterface>;
  pullData: (Query: Query, data: object) => Promise<blogInterface>;
}
