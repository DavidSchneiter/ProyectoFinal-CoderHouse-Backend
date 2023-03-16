import { ProductDao } from "../Daos/Factory";
import { Request, Response} from 'express';
import { IProduct } from "../interfaces";
import { getTime } from "../utils";

/** 
 * @return  Product[]
 */
export const getAll = async (req: Request, res: Response) => {
  res.status(200).json(await ProductDao.getAll());

};
/** 
 * @param string $productId
 * @return  Product
 */
export const getById = async (req: Request, res: Response) => {
  const product = await ProductDao.getById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.status(200).json(await ProductDao.getById(req.params.id));
};
/** 
 * @body string $name
 * @body string $description
 * @body string $code
 * @body string $url
 * @body number $price
 * @body number $stock
 * @return  Product
 */
export const createProduct = async (req: Request, res: Response) => {
  const {name,
    description,
    code,
    url,
    price,
    stock } = req.body;
  const product:IProduct = {
    timestamp: getTime(),
    name,
    description,
    code,
    url,
    price,
    stock
  };
  res.status(200).json(await ProductDao.save(product));
};
/** 
 * @param string $productId
 * @body string $name
 * @body string $description
 * @body string $code
 * @body string $url
 * @body number $price
 * @body number $stock
 * @return  Product
 */
export const updateById = async (req: Request, res:Response) => {
  let product = await ProductDao.getById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "producto no encontrado" });
  }
  const {
    name,
    description,
    code,
    url,
    price,
    stock } = req.body;
  const id = req.params.id
  const newProduct:IProduct = {
    timestamp: getTime(),
    name,
    description,
    code,
    url,
    price,
    stock
  };
  res.status(200).json(await ProductDao.changeById(req.params.id, newProduct));
};
/** 
 * @param string $productId
 * @return  Product
 */
export const deleteById = async (req: Request, res:Response) => {
  const product = await ProductDao.getById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  const resp = await ProductDao.deleteById(req.params.id);
  res.status(200).json(resp);
};