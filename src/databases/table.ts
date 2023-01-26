import collect, { Collection } from "collect.js";
import { DatabaseDriver } from "../interfaces/database-driver.interface";
import { BaseTable } from "./base-table";

export class DatabaseTable extends BaseTable {
  protected tableName: string;
  protected driver: DatabaseDriver;

  constructor(driver: DatabaseDriver, tableName: string) {
    super();

    this.driver = driver;
    this.tableName = tableName;
  }

  insert(data: Record<string, any>) {
    const schema = this.driver.getTableSchema(this.tableName);

    this.validateData(schema, data);

    const createData = this.transformData(data);

    return this.driver.insertData(this.tableName, createData);
  }

  count() {
    return this.driver.getTableData(this.tableName).length;
  }

  query(): Collection<Record<string, any>> {
    return collect(this.driver.getTableData(this.tableName));
  }

  update(_id: string, updateData: Record<string, any>) {
    const date = new Date();

    updateData = {
      ...updateData,
      updatedAt: date.toISOString(),
    };

    return this.driver.update(this.tableName, _id, updateData);
  }

  getAll() {
    return this.driver.getTableData(this.tableName);
  }
}
