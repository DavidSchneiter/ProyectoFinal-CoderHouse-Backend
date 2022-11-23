import { CartContenedor, Contenedor } from "../Containers/ClassArchivo"; 
import {CartFB, CartMongo} from './Carts'
import { ProductMongo, ProductFB } from './Products'
import dotenv from 'dotenv';
dotenv.config()

const DATABASE = process.env.DATABASE || 'mongo'

const getSelectedDatabase = ():any => {
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
    }
}

export const { ProductDao, CartDao } = getSelectedDatabase()