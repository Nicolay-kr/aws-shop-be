
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { products } from './products';
import { v4 } from 'uuid';

const dynamoDB = new DynamoDB();

export const collectProducts = async () => {
  try {
    console.log('executing collectProducts');
    const formattedProducts = products.map((product) => ({
      ...product,
      id: v4(),
    }));
    await Promise.all(
      formattedProducts.map(async (product) => {
        const params = {
          TableName: 'Products',
          Item: marshall({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
          }),
        };

        await dynamoDB.putItem(params);
      })
    );

    await Promise.all(
      formattedProducts.map(async ({ id, count }) => {
        const params = {
          TableName: 'Stocks',
          Item: marshall({ product_id: id, count }),
        };

        await dynamoDB.putItem(params);
      })
    );
    return console.error({ message: 'success' });
  } catch (e) {
    console.error(e);
  }
};
collectProducts()