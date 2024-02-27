# What?

Package to deploy Cards API to your AWS account using DynamoDB as your database.

Resources that are created:

- DynamoDB tables to store users, spaces and cards data
- Lambda function to serve Nest.js application
- API Gateway to accept HTTP requests and proxy them to the Lambda function

# How?

1. npm install
2. npm run build:lambda
3. AWS_PROFILE=<your configured AWS profile> AWS_REGION=<region to deploy to in eu-west-1 format> npm run deploy
