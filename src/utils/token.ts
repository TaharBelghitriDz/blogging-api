import jwt, { SignCallback } from "jsonwebtoken";

export const tokenVrfy = (token: string, clb?: (err: any, rslt: any) => void) =>
  jwt.verify(token, process.env.SECRETKEY as string, clb);

export const tokenSign = (str: string) =>
  jwt.sign({ str: str }, process.env.SECRETKEY as string);
