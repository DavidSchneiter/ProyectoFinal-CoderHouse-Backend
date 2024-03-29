export interface IProduct{
    id?: number;
    _id?: number;
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
  productos?: Array<IProduct>;
}

export interface IUser {
  
  email: string;
  password: string;
  name: string;
  address: string;
  age: number; 
  cellphone: number;
  avatar: string;
}

export interface IMensaje {
  id?: number;
  user: string | undefined;
  timestamp: string;
  text: string;
}