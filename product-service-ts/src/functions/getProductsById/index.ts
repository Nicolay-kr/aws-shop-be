//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        cors: true,
        responseData: {
          200: {
            description: 'Successful API response from API',
            bodyType: 'Product',
          },
          404: {
            description: 'Failed API response',
            bodyType: 'ServerError',
          }
        }
      },
    },
  ],
};
