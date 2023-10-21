import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
  Handler,
} from "aws-lambda";
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall } from "@aws-sdk/util-dynamodb";
import { products } from '../../mockData/products';
import { v4 } from "uuid";
import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';

const dynamoDB = new DynamoDB();

export const collectProducts: Handler = async (
  _event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
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
    formattedProducts.map(async ({id, count}) => {
      const params = {
        TableName: 'Stocks',
        Item: marshall({ product_id: id, count, }),
      };

      await dynamoDB.putItem(params)
    })
  );
  return formatJSONResponse({message: 'success'})
  
};
export const main = middyfy(collectProducts);