import { KnexContainer } from '../../Containers/KnexContainer';
import { IProduct } from '../../interfaces/index';

export class ProductKnex extends KnexContainer<IProduct> {
    constructor() {
        super("products")
    }
}