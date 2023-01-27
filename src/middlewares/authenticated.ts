import { Request, Response, NextFunction } from 'express';

export const Authenticated = (req: Request, res:Response, next:NextFunction) => {
  if (req.isAuthenticated())
    return  res.render('user', { username: JSON.parse(JSON.stringify(req.user)) });
  next();
};