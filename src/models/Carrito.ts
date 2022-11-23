import { model, Schema } from "mongoose"
import { ICart } from "../interfaces"


const CartSchema:Schema = new Schema({
    timestamp: {
        type: String,
        require: true,
        max:100
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }]
})

CartSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response._id;
        delete response.__v
        return response;
    }
})

export const Cart = model<ICart>("Cart", CartSchema)