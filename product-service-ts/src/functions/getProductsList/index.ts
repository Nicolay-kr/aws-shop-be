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
        // documentation: {
        //   summary: 'Get all products',
        //   description: 'Retrieves all products',
        //   methodResponses: [
        //     {
        //       statusCode: 200,
        //       responseBody: {
        //         description: 'Product List',
        //       },
        //       responseModels: {
        //         'application/json': 'ProductList',
        //       },
        //     },
        //     {
        //       statusCode: 400,
        //       responseBody: {
        //         description: 'Error response',
        //       },
        //       responseModels: {
        //         'application/json': 'ErrorResponse',
        //       },
        //     },
        //   ],
        // },
        // authorizer,
        // documentation: {
        //   methodResponses: [
        //     {
        //       statusCode: 200,
        //       description: 'Successful API response',
        //       bodyType: 'Products',
        //     },
        //   ],
        // },
        responses: {
          200: {
            description: 'Successful API response from API',
            bodyType: 'Products',
          }
        }
      },
    },
  ],
};
