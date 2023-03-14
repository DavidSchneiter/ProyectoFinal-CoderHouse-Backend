import { Router, Response, Request } from 'express';
import { Authenticated } from '../middlewares/authenticated';

export const routerUser: Router = Router();

routerUser.get('/', Authenticated,(req, res) => {
    res.redirect('/api/auth/register');
});

routerUser.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return err;
    res.redirect("/api/auth");
  });
});