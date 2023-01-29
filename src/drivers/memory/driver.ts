import { DEFAULT_TABLE_CONFIG } from "../../constants/database.constant";
import { DatabaseDriver } from "../../interfaces/database-driver.interface";
import {
  ConnectionOption,
  FieldType,
  TableConfiguration,
  TableConfigurationRecord,
} from "../../types/database.type";

export class MemoryDriver implements DatabaseDriver {
  protected connectionOption: ConnectionOption;
  protected tableSchema: Record<string, any> = {};
  protected tableConfiguration: TableConfiguration = {};
  protected tableData: Record<string, any> = {};

  public constructor(option: ConnectionOption) {
    this.connectionOption = option;
  }

  public createTable(
    tableName: string,
    schema: Record<string, FieldType>,
    configuration: TableConfigurationRecord | null = null
  ): void {
    this.tableSchema[tableName] = schema;
    this.tableData[tableName] = [];
    this.tableConfiguration[tableName] = configuration
      ? configuration
      : DEFAULT_TABLE_CONFIG;
  }

  public getTableConfiguration(tableName: string): TableConfigurationRecord {
    if (!this.tableExists(tableName)) {
      throw new Error("Create table first");
    }

    return this.tableConfiguration[tableName];
  }

  public tableExists(tableName: string): boolean {
    return !!this.tableSchema[tableName];
  }

  public getTableSchema(tableName: string): Record<string, any> {
    if (!this.tableExists(tableName)) {
      throw new Error("Create table first");
    }

    return this.tableSchema[tableName];
  }

  public getTableData(tableName: string): Array<Record<string, any>> {
    if (!this.tableExists(tableName)) {
      throw new Error("Create table first");
    }

    return this.tableData[tableName];
  }

  public deleteData(tableName: string, _id: string) {
    const data = this.getTableData(tableName);
    const index = this.findIndex(_id, data);

    data.splice(index, 1);
  }

  public findIndex(_id: string, data: Array<Record<string, any>>): number {
    const index = data.findIndex((record) => record._id === _id);

    if (!index) {
      throw new Error("Index is not valid");
    }

    return index;
  }

  public insertData(tableName: string, data: Record<string, any>) {
    const store = this.getTableData(tableName);

    store.push(data);

    return data;
  }

  public update(
    tableName: string,
    _id: string,
    updateData: Record<string, any>
  ) {
    const data = this.getTableData(tableName);

    const index = this.findIndex(_id, data);
    const record = data[index];

    const updated = {
      ...record,
      ...updateData,
    };

    data[index] = updated;

    return updated;
  }
}
