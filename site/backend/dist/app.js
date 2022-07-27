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
const Auths_1 = require("./Models/Auths");
const MongoConnection_1 = require("./MongoConnection");
const MongoHelper_1 = require("./MongoHelper");
const log = (0, LogConfig_1.getLogger)("service.app");
/* Create child categories based on a parent category, effectively allowing you to create a tree of loggers when needed */
// const logApp = logModel.getChildCategory("app");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/post", (req, res) => {
    log.debug("Connection made. Redirecting to React");
    res.redirect("/");
});
app.post("/api", (req, res) => {
    res.json({ resp: "Retrieved this from endpoint" });
});
app.post("/db/getUserAuth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const userInfo = req.body;
    if (!userInfo.username || !req.body.password) {
        return res.status(400).send({
            message: "Missing username or password!",
        });
    }
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const gatheredData = db.collection("Users");
        gatheredData
            .find({ username: userInfo.username, password: userInfo.password })
            .toArray((err, results) => {
            if (results.length > 0) {
                if (results[0].username !== Auths_1.ADMIN_USER) {
                    return res.json({ auth: Auths_1.AUTH_LEVEL.regular });
                }
                else {
                    return res.json({ auth: Auths_1.AUTH_LEVEL.admin });
                }
            }
            else {
                return res.json({ auth: Auths_1.AUTH_LEVEL.rejected });
            }
        });
    });
}));
app.post("/db/getAllUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    if (req.body.password !== "FunStuffPass") {
        return res.status(403).send({
            message: "Incorrect password!",
        });
    }
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const userData = db.collection("Users");
        userData.find().toArray((err, results) => {
            return res.json({ resp: results });
        });
    });
}));
app.post("/db/insertUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const response = "No user added";
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        // parses post input
        const inputData = req.body;
        if (!inputData.username || !inputData.password || !inputData.email) {
            return res.status(400).send({
                message: "Missing username, password or email!",
            });
        }
        const userData = db.collection("Users");
        const insertedData = {
            username: inputData.username,
            password: inputData.password,
            email: inputData.email,
        };
        userData.insertOne(insertedData, (err, result) => {
            return res.json(insertedData);
        });
    });
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => log.debug(`Server started on port ${PORT}`));
//# sourceMappingURL=app.js.map