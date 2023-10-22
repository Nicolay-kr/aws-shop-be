//import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const dynamoDB = new DynamoDB();

export const getProductsById = //: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event: APIGatewayProxyEvent) => {
    let product = null;
    try {
      if (
        event?.pathParameters &&
        'id' in event.pathParameters &&
        event.pathParameters.id
      ) {
        const productItem = await dynamoDB.getItem({
          TableName: 'Products',
          Key: {
            id: {
              S: event.pathParameters.id,
            },
          },
        });

        const stockItem = await dynamoDB.getItem({
          TableName: 'Stocks',
          Key: {
            product_id: {
              S: event.pathParameters.id,
            },
          },
        });

        if (productItem.Item) {
          product = unmarshall(productItem.Item);

          if (stockItem.Item?.count?.N) {
            product = {
              ...product,
              count: stockItem.Item.count.N,
            };
          }
        }
      }

      if (!product) {
        return formatJSONResponse({ message: 'Product not found' }, 404);
      }

      return formatJSONResponse(product);
    } catch (e) {
      errorResponse(e);
    }
  };

export const main = middyfy(getProductsById);
