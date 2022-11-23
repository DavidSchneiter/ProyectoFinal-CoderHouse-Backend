import { Model, ObjectId } from "mongoose";

export class MongoDBContainer {
  model:Model<any>;

  constructor( model:Model<any>) {
    this.model = model;

  }

  async getAll(): Promise<any>{
      return await this.model.find()
  }
  
  async save(obj:object): Promise<any> {
      await this.model.create(obj)

    }
    
  async getById(id: ObjectId): Promise<any>{
      return await this.model.findById(id)
    }
    
  async changeById(id: ObjectId, newData: object): Promise<any>{
     return await this.model.findByIdAndUpdate(id, newData, { new: true })
      
    }
    
  async deleteById(id: ObjectId): Promise<any>{
      return await this.model.findByIdAndRemove(id)
    }
    
}
