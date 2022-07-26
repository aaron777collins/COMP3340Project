import { getLogger } from "./LogConfig";

import { MongoClient, MongoClientOptions } from "mongodb";
const log = getLogger("service.mongoconnection");

// Connection URI
const url = "mongodb://localhost:27017";

export class MongoConnection {
  client: any;

  constructor() {
    // Create mongo client
    this.client = new MongoClient(url);
  }

  async getData(database: string, callbackFunc: (db: any, err?: string) => void) {
    await MongoClient.connect(
      url,
      (err: any, client: { db: (str: string) => any }) => {
        if (err) {
          log.debug("" + String(err));
          callbackFunc(undefined, ("" + String(err)));
        }

        // Specify database you want to access
        const db = client.db(database);

        log.debug(`MongoDB Connected: ${url}`);

        callbackFunc(db);
      }
    );
  }
}
