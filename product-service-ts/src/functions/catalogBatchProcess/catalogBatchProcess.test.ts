import { SQSEvent, Context} from "aws-lambda";

const sendMock = jest.fn();
const putItemMock = jest.fn();

jest.mock('@aws-sdk/client-sns', () => {
  return {
    SNSClient: jest.fn(() => ({
      send: sendMock,
    })),
    PublishCommand: jest.fn(() => ({
    })),
  };
});
jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDB: jest.fn(() => ({
      putItem: putItemMock,
    })),
  };
});

import { catalogBatchProcess } from './handler';

const eventMock = {
  Records: [
    {
      messageId: '1',
      body: `{"title":"1984","description":"George Orwell's dystopian masterpiece that warns of the dangers of totalitarianism.","price":"39.99","count":"2"}`,
    }
  ],
} as SQSEvent;

const contextMock = {} as Context;
const callbackMock = jest.fn();

describe('catalogBatchProcess', () => {
  beforeEach(() => {
    sendMock.mockClear();
    putItemMock.mockClear();
  });

  it('should call putItemMock', async () => {
    await catalogBatchProcess(eventMock, contextMock, callbackMock);
    expect(putItemMock).toHaveBeenCalled();
  });

  it('should call sendMock', async () => {
    await catalogBatchProcess(eventMock, contextMock, callbackMock);
    expect(sendMock).toHaveBeenCalled();
  });
});
