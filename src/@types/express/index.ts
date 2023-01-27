import { IUser } from "../../interfaces";

declare module 'express-serve-static-core' {
  export interface Request {
  user?: IUser;
  }
}