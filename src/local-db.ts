import { Database } from "./databases/database";
import { LocalStorageDriver } from "./drivers/local-storage/driver";
import { MemoryDriver } from "./drivers/memory/driver";
import { DatabaseDriver } from "./interfaces/database-driver.interface";
import { ConnectionOption, ConnectionType } from "./types/database.type";

export class LocalDB {
  createConnection(option: ConnectionOption): Database {
    const driver = this.getDriver(option);

    return new Database(driver);
  }

  private getDriver(option: ConnectionOption): DatabaseDriver {
    if (option.driver === "memory") {
      return new MemoryDriver(option);
    }

    if (option.driver === "localStorage") {
      return new LocalStorageDriver(option);
    }

    throw new Error("Invalid database driver");
  }
}
