import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
  Handler,
} from 'aws-lambda';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { products } from '../../mockData/products';
import { v4 } from 'uuid';
import { middyfy } from '@libs/lambda';
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';

const dynamoDB = new DynamoDB();



export const collectProducts = async () => {
  console.log('executing collectProducts');
  try {
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
    return formatJSONResponse({ message: 'success' });
  } catch (e) {
    console.error('Error executing collectProducts:', e.errors || e);
    errorResponse(e);
  }
};
export const main = middyfy(collectProducts);
