import * as AWS from 'aws-sdk';
import { S3Event } from 'aws-lambda';
import csvParser from 'csv-parser';
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

const client = new SQSClient({});
const SQS_QUEUE_URL: string = `https://sqs.eu-central-1.amazonaws.com/244663611855/catalogItemsQueue`


const importFileParser = async (event: S3Event) => {
  const s3 = new AWS.S3({ region: 'eu-central-1' });

  for (const record of event.Records) {
    const bucketName = record.s3.bucket.name;
    const srcKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' ')); // S3 keyname decoding
    console.log('start reading of');
    const s3Stream = s3.getObject({
        Bucket: bucketName,
        Key: srcKey,
      })
      .createReadStream();
    const parser = csvParser();
    s3Stream.pipe(parser);
    parser.on('data', async (data) => {

      try {
        const res = await sendSqsMessage(JSON.stringify(data));
        console.log('SQS Message: ', res);
      } catch (error) {
        console.log('SQS Error: ', error);
      }
      console.log('data received: ', data);
    });
    await streamFinished(parser);
    console.log('streamFinished');

    const targetKey = srcKey.replace('uploaded/', 'parsed/');

    // Copy the file to the 'parsed' folder
    await s3.copyObject({
        Bucket: bucketName,
        CopySource: `${bucketName}/${srcKey}`,
        Key: targetKey,
      })
      .promise();
    console.log('copy succeed');

    // Delete the file from the 'uploaded' folder
    await s3.deleteObject({
        Bucket: bucketName,
        Key: srcKey,
      })
      .promise();
    console.log('delete succeed');
  }
};

const streamFinished = (stream) => {
  return new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
};

const sendSqsMessage = async (message) => {
  const command = new SendMessageCommand({
    QueueUrl: SQS_QUEUE_URL,
    DelaySeconds: 10,
    // MessageAttributes: {
      // Title: {
      //   DataType: "String",
      //   StringValue: "The Whistler",
      // },
    // },
    MessageBody: message,
  });

  const response = await client.send(command);
  return response;
};

export const main = importFileParser;
