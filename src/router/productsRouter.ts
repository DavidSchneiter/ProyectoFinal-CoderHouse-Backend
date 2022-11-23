import { Router} from 'express';
import { body } from "express-validator";
import { fieldValidator, roleValidator } from "../middlewares";
import { productController } from '../controllers';


export const routerProducts:Router = Router();

routerProducts.get("/", productController.getAll);

routerProducts.get("/:id", productController.getById);

routerProducts.post("/", [
  body("name", "El nombre es obligatorio").notEmpty().isString(),
  body("description", "La descripcion es obligatoria").notEmpty().isString(),
  body("code", "El codigo es obligatorio").notEmpty().isString(),
  body("url", "La url es obligatoria").isLength({
      min: 10,
    }).isString(),
  body("price", "El precio es obligatorio").isNumeric().notEmpty(),
  body("stock", "El stock es obligatorio").isNumeric().notEmpty(),
  fieldValidator
  ], roleValidator, productController.createProduct
);

routerProducts.put("/:id",[
  body("name", "El nombre es obligatorio").notEmpty().isString(),
  body("description", "La descripcion es obligatoria").notEmpty().isString(),
  body("code", "El codigo es obligatorio").notEmpty().isString(),
  body("url", "La url es obligatoria").isLength({
      min: 10,
    }).isString(),
  body("price", "El precio es obligatorio").isNumeric().notEmpty(),
  body("stock", "El stock es obligatorio").isNumeric().notEmpty(),
  fieldValidator
  ], roleValidator, productController.updateById
);

routerProducts.delete("/:id", roleValidator, productController.deleteById);