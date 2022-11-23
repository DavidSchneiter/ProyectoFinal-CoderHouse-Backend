import { FirebaseContainer } from "../../Containers/FirebaseContainer";

export class ProductFB extends FirebaseContainer {
    constructor() {
        super('products')
    }
}