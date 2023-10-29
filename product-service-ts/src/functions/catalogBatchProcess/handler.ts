import { formatJSONResponse, errorResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { SQSEvent, Context, SQSHandler, SQSRecord } from "aws-lambda";

const dynamoDB = new DynamoDB();

export const catalogBatchProcess: SQSHandler = async (
  event: SQSEvent,
  context: Context
): Promise<void> => {
  for (const message of event.Records) {
    await processMessageAsync(message);
  }
  console.info("done");
};

async function processMessageAsync(message: SQSRecord): Promise<any> {
  try {
    console.log(`Processed message ${message.body}`);
    // TODO: Do interesting work based on the new message
    await Promise.resolve(1); //Placeholder for actual async work
  } catch (err) {
    console.error("An error occurred");
  }
}

export const main = catalogBatchProcess;


