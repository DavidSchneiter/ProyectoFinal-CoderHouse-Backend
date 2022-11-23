import { Request, Response} from 'express';
import { ICart, IProduct } from "../interfaces";
import { getTime } from "../utils";
import { ProductDao, CartDao } from "../Daos";


export const getAll = async (req: Request, res:Response) => {
  res.status(200).json(await CartDao.getAll());
};

export const getById = async (req: Request, res: Response) => {
  const productosCart = await CartDao.getById(req.params.id);
  res.status(200).json(productosCart);
};

export const createCart = async (req: Request, res: Response) => {
  const cart:ICart = { timestamp: getTime(), productos: [] };
  res.status(200).json(await CartDao.save(cart));
}

export const deleteById = async (req: Request, res: Response) => {
  const product = await CartDao.getById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }
  const resp = await CartDao.deleteById(req.params.id);
  res.status(200).json(resp);
}

export const addProduct = async (req: Request, res: Response) => {
  const { productsId } = req.body;
  let cart:ICart = await CartDao.getById(req.params.cartId)
  if (!cart) {
    return res.status(404).json({ error: "Cart no encontrado"})
  }
  const product:IProduct = await ProductDao.getById(productsId);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  cart.productos.push(product)
  
  // Para el FileSystem se necesita esta linea
  // await CartDao.deleteById(req.params.cartId);
  
  await CartDao.save(cart)
  res.status(200).json({
      cart
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  let cart: ICart = await CartDao.getById(req.params.cartId)
  if (!cart) {
    return res.status(404).json({ error: "Cart no encontrado" })
  }
  const newCart = await CartDao.deleteProdById(req.params.id_prod, cart.productos)
  // console.log(typeof newCart)
  // cart = {
  //   ...cart,
  //   productos: newCart
  // }
  // await CartDao.deleteById(req.params.cartId)
  // await CartDao.save(cart);
  // console.log(newCart)
  res.status(200).json(`Producto con id: ${req.params.id_prod} eliminado del carrito con id: ${req.params.cartId}`)
}