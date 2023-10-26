import * as AWS from 'aws-sdk';
import { S3Event } from 'aws-lambda';
import csvParser from 'csv-parser';

const importFileParser = async (event: S3Event) => {
  const s3 = new AWS.S3({ region: 'eu-north-1' });
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
    parser.on('data', (data) => {
      console.log(data);
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

export const main = importFileParser;
