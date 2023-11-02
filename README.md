# Amazon DynamoDB console command examples
show items in tables
aws dynamodb scan --table-name Products --region eu-central-1
add item to table
aws dynamodb scan --table-name Products --region eu-central-1 --item '{ id: {'N':'1'}, title: {'S':'To Kill a Mockingbird'}, description: {'S':'Harper exploration'}, price: {'N': 29.99}}'

# start a local development environment
serverless offline start

# Create serverless template
serverless create -t aws-nodejs-typescript -p product-service-ts
