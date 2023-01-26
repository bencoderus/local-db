import { TableConfiguration } from "../types/database.type";

export const SUPPORTED_DATATYPES = ["string", "number", "boolean"];

export const DEFAULT_TABLE_CONFIG = {
  addPrimaryKey: true,
  addTimestamps: true,
};
