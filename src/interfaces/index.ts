// export interface ObjectContainer {
//   id?: number;
//   timestamp: string;
//   name: string;
//   description: string;
//   code: string
//   url: string;
//   price: number;
//   stock: number;
// }

// export interface CartContainer {
//   id?: number;
//   timestamp: string;
//   productos: Array<object>
// }
  
export interface IProduct{
    id?: number;
    timestamp: string;
    name: string;
    description: string;
    code: string
    url: string;
    price: number;
    stock: number;
}

export interface ICart {
  id?: number;
  timestamp: string;
  productos: Array<IProduct>;
}