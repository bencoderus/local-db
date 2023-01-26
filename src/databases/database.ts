import { DatabaseDriver } from "../interfaces/database-driver.interface";
import { FieldType, TableConfigurationRecord } from "../types/database.type";
import { DatabaseTable } from "./table";

export class Database {
  constructor(protected readonly driver: DatabaseDriver) {}

  createTable(
    name: string,
    schema: Record<string, FieldType>,
    configuration: TableConfigurationRecord | null = null
  ): DatabaseTable {
    this.driver.createTable(name, schema, configuration);
    return this.getTable(name);
  }

  getTable(name: string): DatabaseTable {
    return new DatabaseTable(this.driver, name);
  }
}
