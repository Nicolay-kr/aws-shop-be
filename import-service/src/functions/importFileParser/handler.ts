// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


const importFileParser = async (event) => {
  console.log('executing importProductsFile');
  try {
    console.log(event)
    const items = event
    
    return formatJSONResponse(items);
  } catch (e) {
    console.error('Error executing importProductsFile:', e.errors || e);
    errorResponse(e);
  }
};

export const main = middyfy(importFileParser);
