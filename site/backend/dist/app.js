"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Data = __importStar(require("./Data/Data.json"));
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
app.post("/db/updateItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const itemList = Data.Items;
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const itemData = db.collection("Items");
        itemData.deleteMany();
        itemData.insertMany(itemList);
        return res.json({ resp: itemList });
    });
}));
// DO NOT use to avoid duplicate items
app.post("/db/addAllItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const itemList = Data.Items;
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const itemData = db.collection("Items");
        itemData.insertMany(itemList);
        return res.json({ resp: itemList });
    });
}));
app.get("/db/getAllItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const itemData = db.collection("Items");
        itemData.find().toArray((err, results) => {
            return res.json({ resp: results });
        });
    });
}));
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
app.post("/db/checkUsername", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const userInfo = req.body;
    if (!userInfo.username || !req.body.password) {
        return res.status(400).send({
            message: "Missing username or password!",
        });
    }
    if (userInfo.password !== "FunStuffPass123!") {
        return res.status(403).send({
            message: "Incorrect password!",
        });
    }
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const gatheredData = db.collection("Users");
        gatheredData
            .find({ username: userInfo.username })
            .toArray((err, results) => {
            if (results.length > 0) {
                return res.json({ taken: true });
            }
            else {
                return res.json({ taken: false });
            }
        });
    });
}));
app.post("/db/getUserInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const userInfo = req.body;
    if (!userInfo.username || !req.body.password) {
        return res.status(400).send({
            message: "Missing username or password!",
        });
    }
    if (userInfo.password !== "FunStuffPass123!") {
        return res.status(403).send({
            message: "Incorrect password!",
        });
    }
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const gatheredData = db.collection("Users");
        gatheredData
            .find({ username: userInfo.username })
            .toArray((err, results) => {
            if (results.length > 0) {
                return res.json({ username: results[0].username, email: results[0].email });
            }
            else {
                return res.status(403).send({
                    message: "Incorrect username!",
                });
            }
        });
    });
}));
app.post("/db/updateUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const userInfo = req.body;
    if (!userInfo.username ||
        !userInfo.password ||
        !userInfo.email ||
        !userInfo.newUsername) {
        return res.status(400).send({
            message: "Missing username, newUsername, password or email!",
        });
    }
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const gatheredData = db.collection("Users");
        gatheredData
            .find({ username: userInfo.username, password: userInfo.password })
            .toArray((err, results) => {
            if (results.length > 0) {
                const newUserData = {
                    username: userInfo.newUsername,
                    password: userInfo.password,
                    email: userInfo.email,
                };
                gatheredData.deleteOne({
                    username: userInfo.username,
                    password: userInfo.password,
                });
                gatheredData.insertOne(newUserData, (errReturn, result) => {
                    if (errReturn) {
                        return res.status(500).send({
                            message: "Error inserting user data",
                            attemptedData: newUserData
                        });
                    }
                    return res.json({ resp: newUserData });
                });
            }
            else {
                return res.status(403).send({
                    message: "Incorrect username or password!",
                });
            }
        });
    });
}));
app.post("/db/resetUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        // parses post input
        const userData = db.collection("Users");
        const insertedData = {
            username: "admin",
            password: "FunStuffPass123!",
            email: "colli11s@uwindsor.ca",
        };
        userData.deleteMany();
        userData.insertOne(insertedData, (err, result) => {
            return res.json({ resp: insertedData });
        });
    });
}));
app.post("/db/getAllUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    if (req.body.password !== "FunStuffPass123!") {
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
app.post("/db/findUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    if (!req.body.username) {
        return res.status(403).send({
            message: "Missing username!",
        });
    }
    if (req.body.password !== "FunStuffPass123!") {
        return res.status(403).send({
            message: "Incorrect password!",
        });
    }
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const userData = db.collection("Users");
        userData
            .find({ username: req.body.username })
            .toArray((err, results) => {
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
            return res.json({ resp: insertedData });
        });
    });
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => log.debug(`Server started on port ${PORT}`));
//# sourceMappingURL=app.js.map