import { CartContenedor, Contenedor } from "../Containers/ClassArchivo"; 
import {CartFB, CartMongo, CartKnex} from './Carts'
import { ProductMongo, ProductFB, ProductKnex} from './Products'
import { config, logger } from '../utils';
import { createTables } from '../database/sqliteTable';

const DATABASE = config.DATABASE
logger.info(`Database: ${config.DATABASE}`)

const getSelectedDatabase = (): any => {
    switch (DATABASE) {
        case "mongo":{
            return {
                ProductDao: new ProductMongo(),
                CartDao: new CartMongo()
            } 
        }
        case "firebase":{
            return {
                ProductDao: new ProductFB(),
                CartDao: new CartFB()
            }}
        case "fs":{
            return {
                ProductDao: new Contenedor("productos"),
                CartDao: new CartContenedor("carrito")
            }}
        case "sql":{
            createTables()
            return {
                ProductDao: new ProductKnex(),
                CartDao: new CartKnex()
            }}
    }
}
export const { ProductDao, CartDao } = getSelectedDatabase()