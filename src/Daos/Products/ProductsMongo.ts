import { MongoDBContainer } from "../../Containers/MongoDBContainer";
import { Product } from "../../models";

export class ProductMongo extends MongoDBContainer {
    constructor() {
        super(Product);
    }
}
