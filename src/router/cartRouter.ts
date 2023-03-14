import {Router} from 'express';
import { cartController } from '../controllers';


export const routerCart:Router = Router();

routerCart.get("/", cartController.getAll);

routerCart.get("/:id", cartController.getById);

routerCart.post("/", cartController.createCart)

routerCart.delete("/:id", cartController.deleteById)

routerCart.post("/:cartId/productsId", cartController.addProduct);

routerCart.post("/confirm/:cartId", cartController.confirmProducts);

routerCart.delete("/:cartId/productsId/:id_prod", cartController.deleteProduct)