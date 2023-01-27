import { Request, Response } from "express";
import { User } from "../models";
import { logger } from "../utils";
import { transporter } from "../utils";


export const register = async(req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Please enter your email and password." });
  }
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already exists." });
  }
  const newUser = new User(req.body);
  await newUser.save();

  const email = {
    from: 'Servidor eCommerce',
    to: process.env.MAIL,
    subject: 'Mail de nuevo registro',
    html: `<h1 style="color: blue"><span>Nombre: </span> ${req.body.name}</h1> <h1 style="color: red"><span>Email: </span>${req.body.email}</h1> <h1 style="color: green"><span>Dirección: </span>${req.body.address}</h1> <h1 style="color: brown"><span>Edad: </span>${req.body.age}</h1> <h1 style="color: purple"><span>Celular: </span>${req.body.cellphone}</h1>`
  };
  try {
    const info = await transporter.sendMail(email);
    logger.info(info);
  } catch (error) {
    logger.error(error);
  }

  return res.status(200).json({ message: "User created." });
}