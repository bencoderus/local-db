import crypto from "crypto";
import { DatabaseDriver } from "../interfaces/database-driver.interface";

export abstract class BaseTable {
  protected abstract driver: DatabaseDriver;
  protected abstract tableName: string;

  generateId() {
    return crypto.randomUUID();
  }

  validateData(schema: Record<string, any>, data: Record<string, any>) {
    const supportedFieldName = Object.keys(schema);

    for (let key in data) {
      const dataType = typeof data[key];
      const schemaType = schema[key];

      if (
        supportedFieldName.includes(key) &&
        dataType.toLowerCase() !== schemaType.toLowerCase()
      ) {
        throw new Error("Data type is not valid");
      }
    }
  }

  transformData(data: any) {
    const tableConfiguration = this.driver.getTableConfiguration(
      this.tableName
    );

    if (tableConfiguration.addPrimaryKey) {
      data = {
        _id: this.generateId(),
        ...data,
      };
    }

    if (tableConfiguration.addTimestamps) {
      const date = new Date();

      data = {
        ...data,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      };
    }

    return data;
  }
}
