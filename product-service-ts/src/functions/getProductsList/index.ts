//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/products',
        cors: true,
        documentation: {
          summary: 'Get all products',
          description: 'Retrieves all products',
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description: 'Product List',
              },
              responseModels: {
                'application/json': 'ProductList',
              },
            },
            {
              statusCode: 400,
              responseBody: {
                description: 'Error response',
              },
              responseModels: {
                'application/json': 'ErrorResponse',
              },
            },
          ],
        },
      },
    },
  ],
};
