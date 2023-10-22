import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown> | Array<unknown>, statusCode: number = 200) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(response)
  }
}

export const errorResponse = (message: string, errorCode = 500) => {
  return {
    statusCode: errorCode,
    body: JSON.stringify({ message }),
  };
};
