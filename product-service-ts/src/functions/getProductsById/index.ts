//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
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
