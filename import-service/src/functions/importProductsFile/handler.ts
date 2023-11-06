import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';

const BUCKET = 'aws-csv-storage';

export const importProductsFile = async (event: APIGatewayProxyEvent|any) => {
  const s3 = new AWS.S3({region: 'eu-central-1'})
  console.log('executing importProductsFile');
  const fileName = event.queryStringParameters.name;

  if (!fileName) {
    return errorResponse('Filename is required as a query parameter.', 400);
  }

  let signedUrl;

  try {
    const params = {
      Bucket:BUCKET,
      Key: `uploaded/${fileName}`,
      Expires: 60,
      ContentType: 'text/csv'
    }

    signedUrl = s3.getSignedUrl('putObject', params)
    
    return formatJSONResponse(signedUrl);
  } catch (e) {
    console.error('Error executing importProductsFile:', e.errors || e);
    errorResponse(e);
  }
};

export const main = middyfy(importProductsFile);
