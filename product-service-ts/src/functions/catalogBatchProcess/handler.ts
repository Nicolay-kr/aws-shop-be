import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { v4 } from 'uuid';
import { marshall } from '@aws-sdk/util-dynamodb';
import { SQSEvent, SQSHandler, SQSRecord } from 'aws-lambda';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

export const catalogBatchProcess: SQSHandler = async (
  event: SQSEvent
): Promise<void> => {

  for (const message of event.Records) {
    await putProductToDynamoDb(message);
    await publish(message);
  }

};

const putProductToDynamoDb = async (message: SQSRecord): Promise<any> => {

  const dynamoDB = new DynamoDB();

  try {
    console.log(`Processed message ${message.body}`);
    const product = JSON.parse(message.body);
    const formattedProduct = {
      ...product,
      id: v4(),
    };

    const productsParams = {
      TableName: 'Products',
      Item: marshall({
        id: formattedProduct.id,
        title: formattedProduct.title,
        description: formattedProduct.description,
        price: formattedProduct.price,
      }),
    };

    await dynamoDB.putItem(productsParams);

    const stocksParams = {
      TableName: 'Stocks',
      Item: marshall({
        product_id: formattedProduct.id,
        count: formattedProduct.count,
      }),
    };

    await dynamoDB.putItem(stocksParams);
  } catch (e) {
    console.error('putProductToDynamoDb Error: ', e);
  }
};

const publish = async (message) => {
  const snsClient = new SNSClient({});
  const product = JSON.parse(message.body);
  
  
  try {
    const response = await snsClient.send(
      new PublishCommand({
        TopicArn: process.env.SNS_ARN,
        Message: `New product was created: ${JSON.stringify(product)}`,
        Subject: 'New Product was Created',
        MessageAttributes: {
          priceType: {
            DataType: 'String',
            StringValue:
              product.price > 100 ? 'Expensive' : 'Regular',
          },
        },
      })
    );
    console.log('SNS success: ', product);
    return response;
  } catch (e) {
    console.log('SNS Error: ', e);
  }
};

export const main = catalogBatchProcess;
