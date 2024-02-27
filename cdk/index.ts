import { App } from "aws-cdk-lib";

import { ApiStack } from "./stacks/api-stack";
import { DynamoStack } from "./stacks/dynamo-stack";

function main() {
  const app = new App();
  const dbStack = new DynamoStack(app);
  new ApiStack(app, {
    usersTable: dbStack.usersTable,
    spacesTable: dbStack.spacesTable,
    cardsTable: dbStack.cardsTable,
  });
}
main();
