
import { handlerPath } from '@libs/handler-resolver';
// import { basicAuthorizer } from '@authorization-service/functions/';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: '/import',
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
        authorizer: {
          name: 'tokenAuth',
          arn: 'arn:aws:lambda:eu-central-1:244663611855:function:authorization-service-dev-basicAuthorizer',
          type: 'token',
          identitySource: 'method.request.header.Authorization'

        },
      },
    },
  ],
};
