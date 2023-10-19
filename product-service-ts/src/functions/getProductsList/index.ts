//import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';
// import Products from 'src/types/product';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  // handler: `src/functions/getProductsList/handler`,
  events: [
    {
      http: {
        method: 'get',
        path: '/products',
        cors: true,
        responseData: {
          200: {
            description: 'Successful API response',
            bodyType: 'Products',
          },
        },
      },
    },
  ],
};
