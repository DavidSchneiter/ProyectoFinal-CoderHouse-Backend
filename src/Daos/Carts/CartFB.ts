import { FirebaseContainer } from "../../Containers/FirebaseContainer";

export class CartFB extends FirebaseContainer {
    constructor() {
        super('cart');
    };
}