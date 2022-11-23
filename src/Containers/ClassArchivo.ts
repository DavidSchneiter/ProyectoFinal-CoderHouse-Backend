import fs from 'fs';
import { IProduct, ICart } from '../interfaces';
import { getTime } from '../utils';


export class Contenedor {
  contain: Array<IProduct>;
  id: number;
  file: string;

  constructor(file:string) {
    this.contain = [];
    this.id = 0;
    this.file = file;
  }

  async save(obj: IProduct): Promise<string> {
    if (!obj.id) {
      this.id++;
      obj.id = this.id;
    }

    this.contain.push(obj);
    //muchos problemas con esos 2 objetos y el id asi que les puse any
    this.contain.sort((a:any, b:any) => {
      return a.id - b.id;
    });
    try {
      await fs.promises.writeFile(
        `./src/db/${this.file}.txt`,
        JSON.stringify(this.contain, null, 2)
      );
      return `Id asignado ${obj.name}: ${obj.id}`;
    } catch (error) {
      throw new Error(`Imposible guardar ${error}`);
    }
  }
  async getById(id:string):Promise<IProduct>{
    try {
      const data = await fs.promises.readFile(`./src/db/${this.file}.txt`, "utf-8");
      return JSON.parse(data).filter((e:IProduct) => {
        return e.id == parseInt(id);
      })[0];
    } catch (error) {
      throw new Error(`Imposible leer archivo ${error}`);
    }
  }
  async changeById(id:string, newData:IProduct):Promise<string>{
    try {
      let product = await this.getById(id);
      await this.deleteById(id);
      product = {
        id: parseInt(id),
        timestamp: getTime(),
        name: newData.name ? newData.name : product.name,
        description: newData.description ? newData.description : product.description,
        code: newData.code ? newData.code : product.code,
        url: newData.url ? newData.url : product.url,
        price: newData.price ? newData.price : product.price,
        stock: newData.stock ? newData.stock : product.stock,
      };
      await this.save(product)
      return "Producto Actualizado"
    } catch (error) {
       throw new Error(`Imposible guardar ${error}`)
    }
  }
  async getAll():Promise<any> {
    try {
      const data = await fs.promises.readFile(`./src/db/${this.file}.txt`, "utf-8");
      if (!data) return "Archivo vacio";
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Imposible leer archivo ${error}`);
    }
  }
  async deleteById(id: string): Promise<string>{
    try {
      const data = await fs.promises.readFile(`./src/db/${this.file}.txt`, "utf-8");
      const newData = JSON.parse(data).filter((e:IProduct )=> {
        return e.id !== parseInt(id);
      });
      this.contain = newData;
      await fs.promises.writeFile(
        `./src/db/${this.file}.txt`,
        JSON.stringify(newData, null, 2)
      );
      console.log(newData);
      return `Producto id: ${id} eliminado`;
    } catch (error) {
      throw new Error(`Imposible leer archivo ${error}`);
    }
  }
  async deleteAll():Promise<void>{
    try {
      await fs.promises.writeFile(`./${this.file}.txt`, "");
    } catch (error) {
      throw new Error(`Imposible leer archivo ${error}`);
    }
  }
}

export class CartContenedor {
  contain: Array<ICart>;
  id: number;
  file: string;

  constructor(file: string) {
    this.contain = [];
    this.id = 0;
    this.file = file;
  }

  async save(obj: ICart): Promise<string> {
    if (!obj.id) {
      this.id++;
      obj.id = this.id;
    }

    this.contain.push(obj);
    //muchos problemas con esos 2 objetos y el id asi que les puse any
    this.contain.sort((a: any, b: any) => {
      return a.id - b.id;
    });
    try {
      await fs.promises.writeFile(
        `./src/db/${this.file}.txt`,
        JSON.stringify(this.contain, null, 2)
      );
      return `Id asignado: ${obj.id}`;
    } catch (error) {
      throw new Error(`Imposible guardar ${error}`);
    }
  }
  async getById(id: string): Promise<ICart> {
    try {
      const data = await fs.promises.readFile(`./src/db/${this.file}.txt`, "utf-8");
      return JSON.parse(data).filter((e: ICart) => {
        return e.id == parseInt(id);
      })[0];
    } catch (error) {
      throw new Error(`Imposible leer archivo ${error}`);
    }
  }
  async getAll(): Promise<any> {
    try {
      const data = await fs.promises.readFile(`./src/db/${this.file}.txt`, "utf-8");
      if (!data) return "Archivo vacio";
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Imposible leer archivo ${error}`);
    }
  }
  async deleteProdById(id: string, cart: any): Promise<Array<ICart>> {
    try {
      const newData = cart.filter((e: ICart) => {
        return e.id !== parseInt(id);
      })
      return newData
    } catch (error) {
      throw new Error(`Imposible leer archivo ${error}`);
    }
  }
  async deleteById(id: string): Promise<string> {
    try {
      const data = await fs.promises.readFile(`./src/db/${this.file}.txt`, "utf-8");
      const newData = JSON.parse(data).filter((e: ICart) => {
        return e.id !== parseInt(id);
      });
      this.contain = newData;
      await fs.promises.writeFile(
        `./src/db/${this.file}.txt`,
        JSON.stringify(newData, null, 2)
      );
      return `Producto id: ${id} eliminado, lista actualizada`;
    } catch (error) {
      throw new Error(`Imposible leer archivo ${error}`);
    }
  }
  async deleteAll(): Promise<void> {
    try {
      await fs.promises.writeFile(`./${this.file}.txt`, "");
    } catch (error) {
      throw new Error(`Imposible leer archivo ${error}`);
    }
  }
}