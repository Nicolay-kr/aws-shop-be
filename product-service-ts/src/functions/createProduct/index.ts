//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'products',
        cors: true,
        bodyType: 'ProductWithCount',
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
