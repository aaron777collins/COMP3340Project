import { getLogger } from "./LogConfig";

const { MongoClient } = require("mongodb");
const log = getLogger("service.mongoconnection");

// Connection URI
const url = "mongodb://20.163.2.183:27017";

export class MongoConnection {
  client: any;

  constructor() {
    // Create mongo client
    this.client = new MongoClient(url);
  }

  getData(database: string, callbackFunc: (db: any) => void) {
    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err: any, client: { db: (str: string) => any }) => {
        if (err) {
          return log.error(err);
        }

        // Specify database you want to access
        const db = client.db(database);

        log.debug(`MongoDB Connected: ${url}`);

        callbackFunc(db);
      }
    );
  }
}
