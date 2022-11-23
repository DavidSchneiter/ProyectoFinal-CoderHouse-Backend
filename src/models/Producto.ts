import {Schema, model } from "mongoose"
import { IProduct } from '../interfaces/index';

const ProductSchema:Schema = new Schema({
    timestamp: {
        type: String,
        require: true,
        max: 100
    },
    name: {
        type: String,
        required: true,
        max:100
    },
    description: {
        type: String,
        required: true,
        max:150
    },
    code: {
        type: String,
        required: true,
        max:10
    },
    url: {
        type: String,
        required: true,
        max:150
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 1
    }
});

ProductSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response._id;
        delete response.__v
        return response;
    }
})

export const Product = model<IProduct>("Product", ProductSchema)