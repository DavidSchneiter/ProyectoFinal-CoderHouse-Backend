import admin from 'firebase-admin'
import  dbConnectionFirebase  from '../database/configFirebase';

// dbConnectionFirebase()
export class FirebaseContainer {
    collections: string;
    query: admin.firestore.DocumentData
    constructor(collections: string) {
        this.collections = collections;
        this.query = admin.firestore().collection(this.collections)
    }
    async getAll(): Promise<[object]>{
      const querySnapshot = await this.query.get()
      const doc = querySnapshot.docs
      const response = doc.map((doc: admin.firestore.DocumentData) => {
        return ({id: doc.id,
             data: doc.data()});
        })
        return response
  }
  
  async save(obj:object): Promise<void> {
      await this.query.doc().set(obj)

    }
    
  async getById(id: string): Promise<object>{
    const doc = await this.query.doc(id).get()
        return (doc.data());
    }
    
    async changeById(id: string, newData: object): Promise<object> {
        const doc = await this.query.doc(id).set(newData)
        return (doc.data());
    }
    
  async deleteById(id: string): Promise<void>{
      return await this.query.doc(id).delete()
    }
    
}
