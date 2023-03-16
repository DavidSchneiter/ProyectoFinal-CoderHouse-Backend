import knex from 'knex';
import { optionsKnex } from '../database/configKnex';

export class KnexContainer<T> {
    public db = knex(optionsKnex)
    constructor(
            public tableName: string,
    ) {}
    async save(obj:T): Promise<T> {
        return this.db(`${this.tableName}`)
        .insert(obj)
        .then(()=>{return obj})
        // .catch((err) => console.log(err));
        }
    async getAll():Promise<any> {
        return this.db
            .from(`${this.tableName}`)
            .select()
            .then((data) => {
                return data;
            })
            .catch((err) => console.log(err));
    }
    async getById(id:string):Promise<T[]> {
        return this.db
            .from(`${this.tableName}`)
            .where({id}).select().first()
            .then((data) => {
                return data;
            })
    }
    async changeById(id:string, obj:any):Promise<T> {
        return this.db
            .from(`${this.tableName}`)
            .where('id', id).update(obj)
            .then(() => {
                return obj;
            })
    }
    async deleteById(id:string):Promise<string> {
        return this.db
            .from(`${this.tableName}`)
            .where({id}).del()
            .then(() => {
                return 'Element deleted';
            })
    }


}