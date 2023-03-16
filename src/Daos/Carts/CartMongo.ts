import { ObjectId } from "mongoose";
import { MongoDBContainer } from "../../Containers/MongoDBContainer";
import { Cart } from "../../models";


export class CartMongo extends MongoDBContainer {
    constructor() {
        super(Cart);
    }
    
    async getById(id: ObjectId): Promise<any> {
        return await this.model.findById(id).populate({path: 'productos'})
        
    }
    async addOneRelated(idCollection: ObjectId, idRelated: ObjectId): Promise<any>{
     return await this.model.updateOne({id: idCollection},{$push: {productos: idRelated}})
    }
    async deleteOneRelated(idCollection: ObjectId, idRelated: ObjectId): Promise<any>{
     return await this.model.updateOne({id: idCollection},{$pull: {productos: idRelated}})
    }
}