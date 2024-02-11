import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";

import { ApiStack } from "../cdk/stacks/api-stack";

describe("API Stack", () => {
  test("synthesizes the way we expect", () => {
    const app = new App();
    const apiStack = new ApiStack(app, {});

    // Prepare the stack for assertions.
    const template = Template.fromStack(apiStack);

    // Assert it creates the function with the correct properties...
    template.hasResourceProperties("AWS::Lambda::Function", {
      Handler: "main.handler",
      Runtime: "nodejs20.x",
    });
  });
});
