// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { products } from '../../mockData/products';

const getProductsList = async (event) => {
  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
