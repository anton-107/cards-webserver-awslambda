import { App, Stack } from "aws-cdk-lib";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";

export class DynamoStack extends Stack {
  public readonly usersTable: Table;
  public readonly spacesTable: Table;
  public readonly cardsTable: Table;

  constructor(parent: App) {
    super(parent, "CardsWebserverDynamoStack");

    this.usersTable = new Table(this, "usersTable", {
      partitionKey: {
        name: "username",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "sortKey",
        type: AttributeType.STRING,
      },
      tableName: "CardsUsersV1",
      readCapacity: 1,
      writeCapacity: 1,
    });

    this.spacesTable = new Table(this, "spacesTable", {
      partitionKey: {
        name: "spaceID",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "sortKey",
        type: AttributeType.STRING,
      },
      tableName: "CardsSpacesV1",
      readCapacity: 1,
      writeCapacity: 1,
    });

    this.cardsTable = new Table(this, "cardsTable", {
      partitionKey: {
        name: "spaceID",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "cardID",
        type: AttributeType.STRING,
      },
      tableName: "CardsV1",
      readCapacity: 1,
      writeCapacity: 1,
    });
  }
}
