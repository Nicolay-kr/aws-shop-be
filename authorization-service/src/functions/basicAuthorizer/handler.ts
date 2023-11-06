const basicAuthorizer = async (event) => {
  console.log('Event: ', JSON.stringify(event));
  
  if (event.type !== 'TOKEN') {
    return { 
      statusCode: 401, 
      body: 'Unauthorized' 
    };
  }

  try {
    const authorizationToken = event.authorizationToken;
    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const username = plainCreds[0];
    const password = plainCreds[1];

    console.log(`username: ${username}, password: ${password}`);

    const storedUsrPassword = process.env['Nicolay-kr'];
    const effect = !storedUsrPassword || storedUsrPassword !== password ? 'Deny' : 'Allow';
    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    return policy;
  } catch (e) {
    console.error(e);
    return {
      statusCode: 401,
      body: `Unauthorized: ${e.message}`
    };
  }
};

const generatePolicy = (principalId, resource, effect = 'Allow') => {
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
  };
}

export const main = basicAuthorizer;
