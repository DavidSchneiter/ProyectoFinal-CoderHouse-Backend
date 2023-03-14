import {Router} from 'express';
import passport from 'passport';
import { body } from "express-validator";
import { loginController } from '../controllers';
import { Authenticated } from '../middlewares/authenticated';
import { fieldValidator } from '../middlewares/fieldValidator';


export const routerAuth: Router = Router();


routerAuth.get("/", Authenticated,(req, res) => {
  res.render("login");
});

routerAuth.get("/", Authenticated,(req, res) => {
  res.redirect("/api/user");
});

routerAuth.get("/register", Authenticated,(req, res) => {
  res.render("register");
});


routerAuth.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    res.redirect("/api/user");
  }
);

routerAuth.post("/register", [
  body("email", "El email es obligatorio").notEmpty().isString(),
  body("password", "La contraseña es obligatoria").isLength({
    min: 8,
  }).isString(),
  body("name", "El nombre es obligatorio").notEmpty().isString(),
  body("address", "El stock es obligatorio").notEmpty().isString(),
  body("age", "La edad es obligatoria").isNumeric().notEmpty(),
  body("cellphone", "El numero celular es obligatorio").isNumeric().notEmpty(),
  body("avatar", "La url es obligatoria").isLength({
      min: 10,
    }).isString(),
  fieldValidator
  ], loginController.register)

routerAuth.get("/failregister", (req, res) => {
  res.send("failRegister");
});
routerAuth.get("/faillogin", (req, res) => {
  res.send("failLogin");
});