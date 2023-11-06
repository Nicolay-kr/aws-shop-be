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
export type ProductCreation = {
  title: string;
  description?: string;
  price: number;
  count: number;
};
export type ProductId = {
  id: string;
};