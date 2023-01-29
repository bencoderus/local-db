import { FieldType, TableConfigurationRecord } from "../types/database.type";

export interface DatabaseDriver {
  createTable(
    tableName: string,
    schema: Record<string, FieldType>,
    configuration: TableConfigurationRecord | null
  ): void;
  getTableConfiguration(tableName: string): TableConfigurationRecord;
  getTableSchema(tableName: string): Record<string, any>;
  getTableData(tableName: string): Array<any>;
  deleteData(tableName: string, _id: string): void;
  insertData(tableName: string, data: Record<string, any>): Record<string, any>;
  update(
    tableName: string,
    _id: string,
    updateData: Record<string, any>
  ): Record<string, any>;
}
