import { Request, Response} from 'express';
import { ICart, IProduct } from "../interfaces";
import { getTime, logger, transporter } from "../utils";
import { ProductDao, CartDao } from "../Daos/Factory";
import twilio from 'twilio';
import { config } from '../utils';

const client = twilio(config.ACCOUNT_SID, config.AUTH_TOKEN)
/** 
 * @return  Cart[]  
 */
export const getAll = async (req: Request, res:Response) => {
  res.status(200).json(await CartDao.getAll());
};
/** 
 * @param string $cartId
 * @return Cart  
 */
export const getById = async (req: Request, res: Response) => {
  const productosCart = await CartDao.getById(req.params.id);
  res.status(200).json(productosCart);
};
/** 
 * @return Cart  
 */
export const createCart = async (req: Request, res: Response) => {
  const cart:ICart = { timestamp: getTime() };
  res.status(200).json(await CartDao.save(cart));
}
/** 
 * @param string $cartId
 * @return Cart  
 */
export const deleteById = async (req: Request, res: Response) => {
  const product = await CartDao.getById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Carrito no encontrado" });
  }
  const resp = await CartDao.deleteById(req.params.id);
  res.status(200).json(resp);
}
/** 
 * @body string $productId
 * @param string $cartId
 * @return Cart  
 */
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
  
  await CartDao.addOneRelated(req.params.cartId, productsId)
  
  cart = await CartDao.getById(req.params.cartId)
  // Para el FileSystem se necesita esta linea
  // await CartDao.deleteById(req.params.cartId);
  res.status(200).json(
      cart
  );
};
/** 
 * @param string $productId
 * @param string $cartId
 * @return `Producto con id: {}, eliminado del carrito con id: {}`
 */
export const deleteProduct = async (req: Request, res: Response) => {
  let cart: ICart = await CartDao.getById(req.params.cartId)
  if (!cart) {
    return res.status(404).json({ error: "Cart no encontrado" })
  }
  await CartDao.deleteOneRelated(req.params.cartId, req.params.id_prod)
  res.status(200).json(`Producto con id: ${req.params.id_prod}, eliminado del carrito con id: ${req.params.cartId}`)
}
/** 
 * @param string $cartId
 * @return `Carrito id: {}, de {}, confirmado. Productos: {}`
 */
export const confirmProducts = async (req: Request, res: Response) => {
  let cart: ICart = await CartDao.getById(req.params.cartId)

  const productsList = cart.productos?.map((a) => { return `<h1>Descripcion: ${a.description}, Precio: $${a.price}</h1>` });
  const productsTotal = cart.productos?.map((a) => { return a.price }).reduce((a, b) => { return a + b });

  const email = {
    from: 'Servidor eCommerce',
    to: process.env.MAIL,
    subject: `Nuevo pedido de: ${req.user?.name} email:  ${req.user?.email}`,
    html: `<h1 style="color: blue">Lista de productos: </h1> ${productsList} <br> <h1>Total: $${productsTotal}</h1>`
  };
  try {
    client.messages.create({
      body: `Nuevo pedido de: ${req.user?.name}, email:  ${req.user?.email}`,
      from: process.env.WPP_TWILIO,
      to: process.env.WPP_ADMINISTRADOR || 'whatsapp:+5493484537814'
    })
      .then(message => console.log(message.sid));
    
     client.messages.create({
      body: `Lista de productos en su carrito: \n ${cart.productos?.map((a) => { return `Descripcion: ${a.description}, Precio: $${a.price}\n`})} Total: $${productsTotal}`,
      from: process.env.WPP_TWILIO,
      to: `whatsapp:+549${JSON.stringify(req.user?.cellphone)}`
     })
    .then(message => console.log(message.sid));

    const info = await transporter.sendMail(email);
    logger.info(info);
    
  } catch (error) {
    logger.error(error)
  }
  res.status(200).json(`Carrito id: ${req.params.cartId}, de ${req.user?.name}, confirmado. Productos: ${cart.productos}`)
}