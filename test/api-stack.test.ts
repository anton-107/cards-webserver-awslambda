import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";

import { ApiStack } from "../cdk/stacks/api-stack";
import { DynamoStack } from "../cdk/stacks/dynamo-stack";

describe("API Stack", () => {
  test("synthesizes the way we expect", () => {
    const app = new App();
    const dbStack = new DynamoStack(app);
    const apiStack = new ApiStack(app, {
      usersTable: dbStack.usersTable,
      spacesTable: dbStack.spacesTable,
      cardsTable: dbStack.cardsTable,
    });

    // Prepare the stack for assertions.
    const template = Template.fromStack(apiStack);

    // Assert it creates the function with the correct properties...
    template.hasResourceProperties("AWS::Lambda::Function", {
      Handler: "main.handler",
      Runtime: "nodejs20.x",
    });
  });
});
