import { Document, Model } from "mongoose";

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
  editBlog: (args: blogInterface) => Promise<blogInterface>;
}
