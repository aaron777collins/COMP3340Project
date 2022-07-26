"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.post("/dbapi", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const response = "No Results!";
    try {
        yield mongoConnection.getData("funstuff", (db, errorInside) => {
            if (errorInside) {
                // res.json({error: errorInside})
                return res.status(500).send({
                    message: errorInside,
                });
            }
            try {
                const testData = db.collection("testData");
                testData.insertOne({ name: "test data" }, (err, result) => {
                    log.debug("Added row");
                });
                testData.find().toArray((err, results) => {
                    log.debug(String(results));
                    return res.json({ resp: results });
                });
            }
            catch (error2) {
                return res.status(500).send({
                    message: error2,
                });
            }
        });
    }
    catch (error) {
        log.debug(error);
        return res.status(500).send({
            message: error,
        });
    }
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => log.debug(`Server started on port ${PORT}`));
//# sourceMappingURL=app.js.map