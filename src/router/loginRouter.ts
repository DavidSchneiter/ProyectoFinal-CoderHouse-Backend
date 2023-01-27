import {Router} from 'express';
import passport from 'passport';
import { body } from "express-validator";
import { loginController } from '../controllers';
import { Authenticated } from '../middlewares/authenticated';
import { fieldValidator } from '../middlewares/fieldValidator';


export const routerLogin: Router = Router();


routerLogin.get("/", Authenticated,(req, res) => {
  res.render("login");
});

routerLogin.get("/", Authenticated,(req, res) => {
  res.redirect("/api/user");
});

routerLogin.get("/register", (req, res) => {
  res.render("register");
});


routerLogin.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  (req, res) => {
    res.redirect("/api/user");
  }
);

routerLogin.post("/register", [
  body("email", "El email es obligatorio").notEmpty().isString(),
  body("password", "La contraseña es obligatoria").isLength({
    min: 8,
  }).isString(),
  body("name", "El nombre es obligatorio").notEmpty().isString(),
  body("address", "El stock es obligatorio").notEmpty().isString(),
  body("edad", "El precio es obligatorio").isNumeric().notEmpty(),
  body("celular", "El stock es obligatorio").isNumeric().notEmpty(),
  body("avatar", "La url es obligatoria").isLength({
      min: 10,
    }).isString(),
  fieldValidator
  ], loginController.register)

routerLogin.get("/failregister", (req, res) => {
  res.send("failRegister");
});
routerLogin.get("/faillogin", (req, res) => {
  res.send("failLogin");
});