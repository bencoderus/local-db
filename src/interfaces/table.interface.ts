import { Collection } from "collect.js";

export interface DatabaseTable {
  count(): number;
  insert(data: Record<string, any>): Record<string, any>;
  getAll(): Array<any>;
  update(_id: string, updateData: Record<string, any>): Record<string, any>;
  query(): Collection<Record<string, any>>;
}
