export type ConnectionType = "memory" | "localStorage";
export type FieldType = "string" | "number" | "boolean";

export type ConnectionOption = {
  driver: ConnectionType;
  localStorage?: any;
};

export type TableRecord = {
  _id: string;
};

export type TableConfiguration = Record<string, TableConfigurationRecord>;

export type TableConfigurationRecord = {
  addPrimaryKey?: boolean;
  addTimestamps?: boolean;
};
