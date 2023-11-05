import { middyfy } from '@libs/lambda';

const basicAuthorizer = async (event, ctx, cb) => {
  console.log('Event: ', JSON.stringify(event))
  if(event['type'] != 'TOKEN'){
    cb('Unauthorized')
  }

  try {
    const authorizationToken = event.authorizationToken;
    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64')
    const plainCreds = buff.toString('utf-8').split(':');
    const username = plainCreds[0];
    const password = plainCreds[0];

    console.log(`username: ${username}, password: ${password}`);
    
    const storedUsrPassword = process.env['Nicolay-kr'];
    const effect = !storedUsrPassword || storedUsrPassword != password ? 'Deny': 'Allow';
    const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    cb(null, policy)

  } catch (e) {
    cb(`Unauthorized: ${e.message} `)
  }
};

const generatePolicy = (principalId, resource, effect = 'Allow')=> {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        }
      ]
    }

  }

}


export const main = middyfy(basicAuthorizer);
