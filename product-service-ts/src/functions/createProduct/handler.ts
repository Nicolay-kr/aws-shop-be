import type {
  Context,
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
  Handler,
} from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { validateRequiredFields } from '@libs/validation';
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const dynamoDB = new DynamoDB();

export const createProduct: Handler = async (
  event: APIGatewayProxyEventV2,
  _context: Context
): Promise<APIGatewayProxyStructuredResultV2> => {
  if (event.body) {
    console.log('executing createProduct', event.body);
    try {
      const body: Record<string, string> =
        typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

      const missingFields = validateRequiredFields(body, [
        'title',
        'description',
        'price',
        'count',
      ]);

      if (missingFields.length > 0) {
        const response = missingFields.reduce<Record<string, string>>(
          (acc, field) => {
            return {
              ...acc,
              [field]: `${field} is required`,
            };
          },
          {}
        );

        return formatJSONResponse(response, 400);
      }

      const productItem = {
        id: uuid(),
        title: body.title,
        description: body.description,
        price: Number(body.price),
      };

      const stockItem = {
        product_id: productItem.id,
        count: body.count,
      };

      await dynamoDB.putItem({
        TableName: 'Products',
        Item: marshall(productItem),
      });

      await dynamoDB.putItem({
        TableName: 'Stocks',
        Item: marshall(stockItem),
      });

      return formatJSONResponse({ productId: productItem.id }, 201)
    } catch(e) {
      console.error('Error executing createProduct:', e.errors || e);
      return errorResponse(e);
    }
  }

  return errorResponse('body is unprocessable');
};

export const main = middyfy(createProduct);
