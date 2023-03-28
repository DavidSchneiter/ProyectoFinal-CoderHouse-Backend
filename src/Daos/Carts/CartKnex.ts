import { ICart } from '../../interfaces/index';
import { KnexContainer } from '../../Containers/KnexContainer';

export class CartKnex extends KnexContainer<ICart>{
    constructor() {
        super("cart")
    }
    async getById(id: string): Promise<any> {
       return await this.db(`${this.tableName}`)
                .join('products', 'products.id', 'cart.productos')
                .where('cart.id', id)
                .select('*');

    }
    async addOneRelated(idCollection: string, idRelated: string): Promise<any> {
        await this.db(`${this.tableName}`).where('id', idCollection).insert({ productos: idRelated });
        // const carrito = await this.db(`${this.tableName}`).where('id', idCollection).first();
        // await this.db(`${this.tableName}`).where('id', idCollection).update({ productos: carrito.productos});
        
    }
    async deleteOneRelated(idCollection: string, idRelated: string): Promise<any>{
    }

}