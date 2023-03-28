import {Schema, model } from "mongoose"
import { IMensaje } from '../interfaces/index';

const MensajeSchema: Schema = new Schema({
    user: {
        type: 'string',
        required: true
    },
    timestamp: {
        type: String,
        require: true,
        max: 100
    },
    text: {
        type: String,
        required: true,
    }
    
});

MensajeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
})
MensajeSchema.method("createIndex")
export const Mensaje = model<IMensaje>("Mensaje", MensajeSchema)