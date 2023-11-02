import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs:{
        arn: {
          'Fn::GetAtt': ['catalogItemsQueue', 'Arn'],
        },
        batchSize: 5,
      //   enabled?: boolean;
      //   maximumBatchingWindow?: number;
      //   functionResponseType?: "ReportBatchItemFailures";
      //   filterPatterns?: FilterPatterns;
      //   maximumConcurrency?: number;
      },
    },
  ],
};
