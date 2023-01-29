import { DEFAULT_TABLE_CONFIG } from "../../constants/database.constant";
import { DatabaseDriver } from "../../interfaces/database-driver.interface";
import {
  ConnectionOption,
  FieldType,
  TableConfiguration,
  TableConfigurationRecord,
} from "../../types/database.type";
import { LocalStorage } from "./local-storage";

const TABLE_PREFIX = "localdb";
const TABLE_CONFIGURATION_KEY = `${TABLE_PREFIX}_table_configuration`;
const TABLE_SCHEMA_KEY = `${TABLE_PREFIX}_table_schema`;

export class LocalStorageDriver implements DatabaseDriver {
  protected tableSchema: Record<string, any> = {};
  protected tableConfiguration: TableConfiguration = {};
  protected tableData: Record<string, any> = {};
  protected storage: LocalStorage;

  public constructor(protected readonly options: ConnectionOption) {
    this.storage = new LocalStorage(options.localStorage);
  }

  public getTableKey(tableName: string) {
    return `${TABLE_PREFIX}_${tableName}`;
  }

  public createTable(
    tableName: string,
    schema: Record<string, FieldType>,
    configuration: TableConfigurationRecord | null = null
  ): void {
    this.saveSchema(tableName, schema);
    this.saveConfiguration(tableName, configuration);

    this.storage.put(this.getTableKey(tableName), []);
  }

  private saveSchema(tableSchema: string, schema: Record<string, FieldType>) {
    const key = `${TABLE_PREFIX}_table_schema`;
    const existing = this.storage.get(key) ?? {};

    existing[tableSchema] = schema;

    this.storage.put(key, existing);
  }

  private saveConfiguration(
    tableSchema: string,
    configuration: TableConfigurationRecord | null
  ) {
    const key = `${TABLE_PREFIX}_table_configuration`;
    const existing = this.storage.get(key) ?? {};

    existing[tableSchema] = configuration;

    this.storage.put(key, existing);
  }

  public getTableConfiguration(tableName: string): TableConfigurationRecord {
    if (!this.tableExists(tableName)) {
      throw new Error("Create table first");
    }

    return this.storage.get(TABLE_CONFIGURATION_KEY);
  }

  public tableExists(tableName: string): boolean {
    return this.storage.exists(this.getTableKey(tableName));
  }

  public getTableSchema(tableName: string): Record<string, any> {
    if (!this.tableExists(tableName)) {
      throw new Error("Create table first");
    }

    return this.storage.get(TABLE_SCHEMA_KEY);
  }

  public getTableData(tableName: string): Array<Record<string, any>> {
    if (!this.tableExists(tableName)) {
      throw new Error("Create table first");
    }

    return this.storage.get(this.getTableKey(tableName));
  }

  public deleteData(tableName: string, _id: string) {
    const data = this.getTableData(tableName);
    const index = this.findIndex(_id, data);

    data.splice(index, 1);

    this.storage.put(this.getTableKey(tableName), data);
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

    this.storage.put(this.getTableKey(tableName), data);

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

    this.storage.put(this.getTableKey(tableName), data);

    return updated;
  }
}
