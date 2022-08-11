import { getLogger } from "./LogConfig";
import { MongoConnection } from "./MongoConnection";

const log = getLogger("service.mongohelper");

export async function callFunctionWithExpressReturns(
  res: any,
  callbackFunc: (db: any, err?: string) => void
) {
  // This helper function wraps the connection helper and safely (and easily) returns a mongo db context that
  // can be searched, inserted into, etc.
  const mongoConnection = new MongoConnection();

  // Opens a connection to the 'funstuff' database (safely)
  try {
    await mongoConnection.callFunction(
      "funstuff",
      (db: { collection: (arg0: string) => any }, errorInside: any) => {
        if (errorInside) {
          return res.status(500).send({
            message: errorInside,
          });
        }

        // Once connection is opened, call back the callback function and pass the database context
        try {
          return callbackFunc(db, errorInside);
        } catch (userError) {
          return res.status(500).send({
            message: userError,
          });
        }
      }
    );
  } catch (generalerror) {
    log.debug(generalerror);
    return res.status(500).send({
      message: generalerror,
    });
  }
}
