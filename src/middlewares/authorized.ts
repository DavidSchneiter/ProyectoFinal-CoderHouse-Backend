import { Request, Response, NextFunction } from 'express';

export const Authorized = (req: Request, res:Response, next:NextFunction) => {
  if (req.isAuthenticated())
    return  next();
};