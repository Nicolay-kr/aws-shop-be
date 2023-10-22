// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

const dynamoDB = new DynamoDB();

const getProductsList = async (event) => {
  try {
    const productsScan = await dynamoDB.scan({
      TableName: 'Products',
    });
    const stocksScan = await dynamoDB.scan({
      TableName: 'Stocks',
    });
    const products = productsScan.Items?.map((product) => unmarshall(product));
    const stocks = stocksScan.Items?.map((stock) => unmarshall(stock));
    const items = products?.map((product) => {
      let result = { ...product };
      const stock = stocks?.find((stock) => stock.product_id === product.id);

      if (stock) {
        result = {
          ...result,
          count: stock.count,
        };
      }

      return result;
    });

    return formatJSONResponse(items);
  } catch (e) {
    errorResponse(e);
  }
};

export const main = middyfy(getProductsList);
