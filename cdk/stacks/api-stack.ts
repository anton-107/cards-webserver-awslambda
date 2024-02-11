import { App, Stack } from "aws-cdk-lib";
import {
  IResource,
  LambdaIntegration,
  MockIntegration,
  PassthroughBehavior,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { Code, Function, FunctionBase, Runtime } from "aws-cdk-lib/aws-lambda";

interface ApiStackProperties {}

export class ApiStack extends Stack {
  constructor(
    private parent: App,
    private properties: ApiStackProperties,
  ) {
    super(parent, "CardsWebserverApiStack");

    const corsAllowedOrigins = "http://localhost:8080";
    this.buildAPIFunctions(corsAllowedOrigins);
  }

  private buildAPIFunctions(corsAllowedOrigins: string): FunctionBase[] {
    const apiNestHandlerFunction = new Function(this, "CardsApiNestHandler", {
      code: Code.fromAsset("./dist"),
      runtime: Runtime.NODEJS_20_X,
      handler: "main.handler",
      environment: {
        CORS_ALLOWED_ORIGINS: corsAllowedOrigins,
      },
    });

    const api = new RestApi(this, "CardsApi", {
      deploy: true,
    });

    const proxy = api.root.addProxy({
      defaultIntegration: new LambdaIntegration(apiNestHandlerFunction, {
        proxy: true,
      }),
    });

    this.addCORSOptions(proxy, corsAllowedOrigins);

    return [apiNestHandlerFunction];
  }

  private addCORSOptions(resource: IResource, corsAllowedOrigins: string) {
    resource.addMethod(
      "OPTIONS",
      new MockIntegration({
        integrationResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Headers":
                "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
              "method.response.header.Access-Control-Allow-Origin": `'${corsAllowedOrigins}'`,
              "method.response.header.Access-Control-Allow-Credentials":
                "'true'",
              "method.response.header.Access-Control-Allow-Methods":
                "'OPTIONS,GET,PUT,POST,PATCH,DELETE'",
            },
          },
        ],
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestTemplates: {
          "application/json": '{"statusCode": 200}',
        },
      }),
      {
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Headers": true,
              "method.response.header.Access-Control-Allow-Methods": true,
              "method.response.header.Access-Control-Allow-Credentials": true,
              "method.response.header.Access-Control-Allow-Origin": true,
            },
          },
        ],
      },
    );
  }
}
