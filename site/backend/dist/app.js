"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const LogConfig_1 = require("./LogConfig");
const MongoConnection_1 = require("./MongoConnection");
const log = (0, LogConfig_1.getLogger)("service.app");
/* Create child categories based on a parent category, effectively allowing you to create a tree of loggers when needed */
// const logApp = logModel.getChildCategory("app");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.post("/post", (req, res) => {
    log.debug("Connection made. Redirecting to React");
    res.redirect("/");
});
app.post("/api", (req, res) => {
    res.json({ resp: "Retrieved this from endpoint" });
});
app.post("/dbapi", (req, res) => {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    let response = "No Results!";
    mongoConnection.getData("funstuff", (db) => {
        const testData = db.collection('testData');
        testData.insetOne({ name: "test data" }, (err, result) => { log.debug("Added row"); });
        testData.find().toArray((err, results) => {
            log.debug(results);
            response = results;
        });
    });
    res.json({ resp: response });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => log.debug(`Server started on port ${PORT}`));
//# sourceMappingURL=app.js.map