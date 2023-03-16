import { model, Schema } from "mongoose"
import { ICart } from "../interfaces"


const CartSchema:Schema = new Schema({
    timestamp: {
        type: String,
        require: true,
        max:100
    },
    products_id: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }]
})

CartSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
})

export const Cart = model<ICart>("Cart", CartSchema)