import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/collect-products',
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
