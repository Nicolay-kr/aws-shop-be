//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'products',
        cors: {
          origin: '*',
          headers: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
            'X-Amz-Security-Token',
            'X-Amz-User-Agent',
            'Access-Control-Allow-Origin',
          ],
        },
        bodyType: 'ProductCreation',
        responseData: {
          201: {
            description: 'The product was created',
            bodyType: 'ProductId',
          },
          400: {
            description: 'The product was not created',
            bodyType: 'Product',
          },
          422: {
            description: 'Body is unprocessable',
            bodyType: 'ServerError',
          }
        }
      },
    },
  ],
};
