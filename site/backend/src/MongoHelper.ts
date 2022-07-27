import { getLogger } from "./LogConfig";
import { MongoConnection } from "./MongoConnection";

const log = getLogger("service.mongohelper");

export async function callFunctionWithExpressReturns(res: any, callbackFunc: (db: any, err?: string) => void) {

    const mongoConnection = new MongoConnection();

    try {
        await mongoConnection.callFunction("funstuff", (db: { collection: (arg0: string) => any; }, errorInside: any) => {
          if (errorInside) {
            return res.status(500).send({
              message: errorInside,
            });
          }

          try {
            return callbackFunc(db, errorInside);
          } catch (userError) {
            return res.status(500).send({
              message: userError,
            });
          }
        });
      } catch (generalerror) {
        log.debug(generalerror);
        return res.status(500).send({
          message: generalerror,
        });
      }

}