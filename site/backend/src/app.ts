import cors from "cors";
import express from "express";
import {getLogger} from "./LogConfig";
import { MongoConnection } from "./MongoConnection";

const log = getLogger("service.app");

/* Create child categories based on a parent category, effectively allowing you to create a tree of loggers when needed */
// const logApp = logModel.getChildCategory("app");

const app = express();
app.use(cors())

app.post("/post", (req: any, res: any) => {
    log.debug("Connection made. Redirecting to React");
    res.redirect("/");
});

app.post("/api", (req: any, res: any) => {
    res.json({resp: "Retrieved this from endpoint"});
});

app.post("/dbapi", (req: any, res: any) => {
    let mongoConnection = new MongoConnection();

    let response = "No Results!";

    mongoConnection.getData("funstuff", (db) => {
        const testData = db.collection('testData');
        testData.insetOne({ name: "test data"}, (err: any, result: any) => {});
        testData.find().toArray((err: any, results:any) => {
            log.debug(results);
            response = results;
        });
    })

    res.json({resp: response});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => log.debug(`Server started on port ${PORT}`));
