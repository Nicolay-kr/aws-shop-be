//import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { products } from '../../mockData/products';

//import schema from './schema';

export const getProductsById = //: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event: APIGatewayProxyEvent) => {
    const productId = event.pathParameters?.id;
    const product = products.find(item => item.id === productId );
    if (!product) return {...formatJSONResponse({ message: 'Product not found' }), statusCode: 404};

    return formatJSONResponse(product);
  };

export const main = middyfy(getProductsById);
