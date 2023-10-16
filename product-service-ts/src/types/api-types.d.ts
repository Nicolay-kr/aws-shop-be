import { ServerError } from './error';
// import Product from './product';

// export type __do_not_use_Product = Product;
// export type __do_not_use_ServerError = ServerError;
// export type product = Product;

// export type Product = Product[];

export type Product = {
  id: string;
  title: string;
  description?: string;
  price: number;
};
export type Products = Product[];
export type ServerError = {
  message: string;
};
export default Product;
