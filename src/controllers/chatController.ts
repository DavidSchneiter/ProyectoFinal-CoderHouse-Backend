import { MensajeDao } from "../Daos/Factory";
import { request, Request, Response } from 'express';
import { getTime } from '../utils/getTime';
import { IMensaje } from '../interfaces/index';

/** 
 * @return  Product[]
 */
export const getAll = async () => {
  return await MensajeDao.getAll();
};

/** 
 * @param string $text
 * @return  Mensaje
 */
export const createMensaje = async (message: {user:string, text:string}) => {
  const mensaje: IMensaje = {
    user: message.user,
    timestamp: getTime(),
    text: message.text,
  };
  return await MensajeDao.save(mensaje);
};