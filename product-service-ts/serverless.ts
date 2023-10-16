import type { AWS } from '@serverless/typescript';

import { getProductsById, getProductsList } from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'product-service-ts',
  frameworkVersion: '3',
  plugins: [
    'serverless-auto-swagger',
    // 'serverless-webpack'
    'serverless-esbuild',
    'serverless-openapi-documenter',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-central-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { getProductsById, getProductsList },
  package: { individually: true },
  custom: {
    autoswager:{
      typefiles: ['./src/types/schemas.d.ts']
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
    documentation: {
      version: '1.0.0',
      title: 'Products API',
      description: 'Api to get products',
      // models: [
      //   {
      //     name: 'Products',
      //     description: 'Products',
      //     contentType: 'application/json',
      //     schema: '${file(schemas/schemas.json):definitions.Product}',
      //   },
      //   {
      //     name: 'ProductList',
      //     description: 'Product List',
      //     contentType: 'application/json',
      //     schema:
      //       '${file(schemas/schemas.json):definitions.ProductListResponse}',
      //   },
      //   {
      //     name: 'ErrorResponse',
      //     description: 'Error Response',
      //     contentType: 'application/json',
      //     schema: '${file(schemas/schemas.json):definitions.ServerError}',
      //   },
      // ],
    },
    // webpack:
    //   {webpackConfig: './webpack.config.js'}
  },
};

module.exports = serverlessConfiguration;
