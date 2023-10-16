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
        // documentation: {
        //   pathParams: [
        //     {
        //       name: 'id',
        //       description: 'Product Id',
        //       schema: {
        //         type: 'string',
        //       },
        //     },
        //   ],
        //   summary: 'Get product by id',
        //   description: 'Get product by id',
        //   methodResponses: [
        //     {
        //       statusCode: 200,
        //       responseBody: {
        //         description: 'Product',
        //       },
        //       responseModels: {
        //         'application/json': 'Product',
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
        // documentation: {
        //   methodResponses: [
        //     {
        //       statusCode: 200,
        //       description: 'Successful API response',
        //       bodyType: 'Product',
        //     },
        //     {
        //       statusCode: 404,
        //       description: 'Failed API response',
        //       bodyType: 'ServerError',
        //     },
        //   ],
        // },
        responses: {
          200: {
            description: 'Successful API response from API',
            bodyType: 'Products',
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
