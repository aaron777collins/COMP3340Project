import cors from "cors";
import express from "express";
import { getLogger } from "./LogConfig";
import { MongoConnection } from "./MongoConnection";

const log = getLogger("service.app");

/* Create child categories based on a parent category, effectively allowing you to create a tree of loggers when needed */
// const logApp = logModel.getChildCategory("app");

const app = express();
app.use(cors());

app.post("/post", (req: any, res: any) => {
  log.debug("Connection made. Redirecting to React");
  res.redirect("/");
});

app.post("/api", (req: any, res: any) => {
  res.json({ resp: "Retrieved this from endpoint" });
});

<<<<<<< HEAD
app.post("/dbapi", (req: any, res: any) => {
    const mongoConnection = new MongoConnection();
=======
app.post("/dbapi", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();
>>>>>>> aleksa

  const response = "No Results!";

  try {
    await mongoConnection.getData("funstuff", (db, errorInside) => {
      if (errorInside) {
        // res.json({error: errorInside})
        return res.status(500).send({
          message: errorInside,
        });
      }

      try {
        const testData = db.collection("testData");
        testData.insertOne({ name: "test data" }, (err: any, result: any) => {
          log.debug("Added row");
        });
        testData.find().toArray((err: any, results: any) => {
          log.debug(String(results));
          return res.json({ resp: results });
        });
      } catch (error2) {
        return res.status(500).send({
          message: error2,
        });
      }
    });
  } catch (error) {
    log.debug(error);
    return res.status(500).send({
      message: error,
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => log.debug(`Server started on port ${PORT}`));
