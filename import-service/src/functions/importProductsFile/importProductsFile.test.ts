import { importProductsFile } from './handler';
import { APIGatewayProxyEvent } from 'aws-lambda';

const mockGetSignedUrl = jest.fn();

jest.mock('aws-sdk', () => {
  return {
    S3: jest.fn(() => ({
      getSignedUrl: mockGetSignedUrl,
    })),
  };
});

describe('importProductsFile', () => {
  beforeEach(() => {
    mockGetSignedUrl.mockClear();
  });

  it('should return signed URL', async () => {
    const mockSignedUrl = 'https://mock-signed-url';
    mockGetSignedUrl.mockReturnValue(mockSignedUrl);

    const result = await importProductsFile({
      queryStringParameters: {
        name: 'test.csv',
      },
    } as unknown as APIGatewayProxyEvent);

    const body = JSON.parse(result.body);
    expect(result.statusCode).toBe(200);
    expect(body).toBe(mockSignedUrl);
  });
});
