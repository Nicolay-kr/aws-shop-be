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
export type ProductWithCount = Product & {
  count: string;
};
export type ProductId = {
  id: string;
};