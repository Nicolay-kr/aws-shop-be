import getProductsList from './getProductsList';
import products from '../constants/products.js';

const mockEvent = {};

describe('Lambda getProductsList for All Products', () => {
  it('should return all products', async () => {
    const result = await getProductsList(mockEvent);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(products);
  });
});