import type { AWS } from '@serverless/typescript';

import { getProductsById, getProductsList, createProduct, collectProducts, catalogBatchProcess } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service-ts',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-auto-swagger',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-central-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SNS_ARN:{
        Ref: 'SNSTopic'
      },
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'sqs:*',
        Resource: {
          'Fn::GetAtt': ['catalogItemsQueue', 'Arn'],
        },
      },
      {
        Effect: 'Allow',
        Action: 'sns:*',
        Resource: {
          Ref: 'SNSTopic'
        },
      },
      {
        Effect: 'Allow',
        Action: 'dynamodb:*',
        Resource: [
          'arn:aws:dynamodb:eu-central-1:244663611855:table/Products',
          'arn:aws:dynamodb:eu-central-1:244663611855:table/Stocks',
        ]
      }

    ],
  },
  // import the function via paths
  functions: { getProductsById, getProductsList, createProduct, collectProducts, catalogBatchProcess },
  package: { individually: true },
  resources: {
    Resources: {
      ProductsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'Products',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
      StocksTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'Stocks',
          AttributeDefinitions: [
            {
              AttributeName: 'product_id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'product_id',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
      catalogItemsQueue:{
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue',
        }
      },
      SNSTopic:{
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName:'createProductTopic',
          
        }
      },
      SNSSubscription:{
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'nicolay.krischenovich@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic'
          },
        }
      },
    },
  },
  custom: {
    autoswagger: {
      title: 'product-service-ts',
      generateSwaggerOnDeploy: false,
      typefiles: ['./src/types/api-types.d.ts'],
      basePath: '/dev',
      apiType: 'http'
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
