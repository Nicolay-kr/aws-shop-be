import getProductsById from './getProductsById';
import products from '../constants/products.js';

const mockEvent = {
  pathParameters: {
    productId: '1',
  },
};

describe.only('Lambda getProductsById', () => {
  it('should return product when it exists', async () => {
    const result = await getProductsById(mockEvent);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual(products[0]);
  });

  it('should return 404 when product is not found', async () => {
    const nonExistentProductId = '999';
    const eventWithNonExistentProduct = {
      ...mockEvent,
      pathParameters: { productId: nonExistentProductId },
    };

    const result = await getProductsById(eventWithNonExistentProduct);
    expect(result.statusCode).toBe(404);
    expect(JSON.parse(result.body)).toEqual({
      message: `Product with id ${nonExistentProductId} not found`,
      input: eventWithNonExistentProduct,
    });
  });
});