import { FieldType, TableConfigurationRecord } from "../types/database.type";
import { DatabaseTable } from "./table.interface";

export interface Database {
  createTable(
    name: string,
    schema: Record<string, FieldType>,
    configuration?: TableConfigurationRecord | null
  ): DatabaseTable;
  getTable(name: string): DatabaseTable;
}
