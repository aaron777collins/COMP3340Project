import cors from "cors";
import express from "express";
import {getLogger} from "./LogConfig";

const log = getLogger("model.app");

/* Create child categories based on a parent category, effectively allowing you to create a tree of loggers when needed */
// const logApp = logModel.getChildCategory("app");

const app = express();
app.use(cors())

app.post("/post", (req: any, res: any) => {
    log.debug("Connection made. Redirecting to React");
    res.redirect("/");
});

app.post("/api", (req: any, res: any) => {
    res.json({resp: "Test"});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => log.debug(`Server started on port ${PORT}`));
