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
// Start express server
const app = (0, express_1.default)();
// Use json for input/output
app.use(express_1.default.json());
// Use CORS
app.use((0, cors_1.default)());
// Ununsed --> Used to redirect back to the main page when testing backend
app.post("/post", (req, res) => {
    log.debug("Connection made. Redirecting to React");
    res.redirect("/");
});
// Basic response useful for initial debugging of the api
app.post("/api", (req, res) => {
    res.json({ resp: "Retrieved this from endpoint" });
});
// Removes all items in the database and then adds them again
app.post("/db/updateItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Creates new mongo connection
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const itemList = Data.Items;
    // Safely reaches out to mongo and gets database context
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        // gets items collections from the database
        const itemData = db.collection("Items");
        // Deletes the collection
        itemData.deleteMany();
        // Inserts the new items list
        itemData.insertMany(itemList);
        // Returns the results
        return res.json({ resp: itemList });
    });
}));
// DO NOT use to avoid duplicate items
// Adds all items but doesn't remove any
// This breaks the db if the items already exist
// This function is useful for breaking the backend (for testing/debugging purposes)
app.post("/db/addAllItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Creates mongo connection
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const itemList = Data.Items;
    // Safely gets db context
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        // Gets items collection
        const itemData = db.collection("Items");
        // Inserts item list
        itemData.insertMany(itemList);
        // Returns results
        return res.json({ resp: itemList });
    });
}));
// Returns all the items in the database
app.get("/db/getAllItems", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // New mongo connection
    const mongoConnection = new MongoConnection_1.MongoConnection();
    // Safely gets database context
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        // Gets items collection
        const itemData = db.collection("Items");
        // Searches items (with empty filter) to return all items
        itemData.find().toArray((err, results) => {
            // Returns all items
            return res.json({ resp: results });
        });
    });
}));
// Gets the user authentication level given a username and password
app.post("/db/getUserAuth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    // Gets the params object
    const userInfo = req.body;
    // Checks that theres a username and password
    if (!userInfo.username || !req.body.password) {
        return res.status(400).send({
            message: "Missing username or password!",
        });
    }
    // Safely gets db context
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        // Gets users collection
        const gatheredData = db.collection("Users");
        // Searches the users collection for an object with the username and password parameters
        gatheredData
            .find({ username: userInfo.username, password: userInfo.password })
            .toArray((err, results) => {
            // If there are results
            if (results.length > 0) {
                // Return back their auth level
                if (results[0].username !== Auths_1.ADMIN_USER) {
                    return res.json({ auth: Auths_1.AUTH_LEVEL.regular });
                }
                else {
                    return res.json({ auth: Auths_1.AUTH_LEVEL.admin });
                }
            }
            else {
                // Otherwise, it was rejected, return a rejected one
                return res.json({ auth: Auths_1.AUTH_LEVEL.rejected });
            }
        });
    });
}));
// Checks if a username exists
app.post("/db/checkUsername", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const userInfo = req.body;
    // Ensures there is a username and the admin pass
    if (!userInfo.username || !req.body.password) {
        return res.status(400).send({
            message: "Missing username or password!",
        });
    }
    // Checks for admin pass
    if (userInfo.password !== "FunStuffPass123!") {
        return res.status(403).send({
            message: "Incorrect password!",
        });
    }
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const gatheredData = db.collection("Users");
        // Searches for username
        gatheredData
            .find({ username: userInfo.username })
            .toArray((err, results) => {
            if (results.length > 0) {
                // If results, return object with taken true
                return res.json({ taken: true });
            }
            else {
                // Otherwise, taken is false
                return res.json({ taken: false });
            }
        });
    });
}));
// Gets the user's info (requires username and pass)
app.post("/db/getUserInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const userInfo = req.body;
    // Check username and pass exists
    if (!userInfo.username || !req.body.password) {
        return res.status(400).send({
            message: "Missing username or password!",
        });
    }
    // Check pass for admin password
    if (userInfo.password !== "FunStuffPass123!") {
        return res.status(403).send({
            message: "Incorrect password!",
        });
    }
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const gatheredData = db.collection("Users");
        // Find object with the username
        gatheredData
            .find({ username: userInfo.username })
            .toArray((err, results) => {
            if (results.length > 0) {
                // If found, return back the username and email
                return res.json({ username: results[0].username, email: results[0].email });
            }
            else {
                // else, no username found. Return error
                return res.status(403).send({
                    message: "Incorrect username!",
                });
            }
        });
    });
}));
// Updates a user's info
app.post("/db/updateUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const userInfo = req.body;
    // Checks that all params exist
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
        // Finds an object with the given username nad password
        gatheredData
            .find({ username: userInfo.username, password: userInfo.password })
            .toArray((err, results) => {
            // If found, create a new object with the new username and email
            if (results.length > 0) {
                const newUserData = {
                    username: userInfo.newUsername,
                    password: userInfo.password,
                    email: userInfo.email,
                };
                // Delete the old one
                gatheredData.deleteOne({
                    username: userInfo.username,
                    password: userInfo.password,
                });
                // Insert new one
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
                // Otherwise, it was incorrect username and pass
                return res.status(403).send({
                    message: "Incorrect username or password!",
                });
            }
        });
    });
}));
// Resets the user's collection to a default value
app.post("/db/resetUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    // Gets safe db context
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        // parses post input
        // Gets user collection
        const userData = db.collection("Users");
        // Creates default object
        const insertedData = {
            username: "admin",
            password: "FunStuffPass123!",
            email: "colli11s@uwindsor.ca",
        };
        // Deletes all users
        userData.deleteMany();
        // Inserts the default admin user
        userData.insertOne(insertedData, (err, result) => {
            return res.json({ resp: insertedData });
        });
    });
}));
// Returns all user info
app.post("/db/getAllUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    // Ensures the password entered is the admin pass
    if (req.body.password !== "FunStuffPass123!") {
        return res.status(403).send({
            message: "Incorrect password!",
        });
    }
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const userData = db.collection("Users");
        // Gets all user objects
        userData.find().toArray((err, results) => {
            // Returns them in an object
            return res.json({ resp: results });
        });
    });
}));
// Returns selected user (requires admin pass)
app.post("/db/findUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    // Checks for username
    if (!req.body.username) {
        return res.status(403).send({
            message: "Missing username!",
        });
    }
    // Checks to ensure admin pass
    if (req.body.password !== "FunStuffPass123!") {
        return res.status(403).send({
            message: "Incorrect password!",
        });
    }
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        const userData = db.collection("Users");
        // Finds the user with the given username
        userData
            .find({ username: req.body.username })
            .toArray((err, results) => {
            // Returns back all info
            return res.json({ resp: results });
        });
    });
}));
// Inserts a user in the db
app.post("/db/insertUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = new MongoConnection_1.MongoConnection();
    const response = "No user added";
    (0, MongoHelper_1.callFunctionWithExpressReturns)(res, (db, errInside) => {
        // parses post input
        const inputData = req.body;
        // Ensures username, pass and email params
        if (!inputData.username || !inputData.password || !inputData.email) {
            return res.status(400).send({
                message: "Missing username, password or email!",
            });
        }
        const userData = db.collection("Users");
        // Creates data object based on username, pass and email
        const insertedData = {
            username: inputData.username,
            password: inputData.password,
            email: inputData.email,
        };
        // Inserts into the users collection
        userData.insertOne(insertedData, (err, result) => {
            // Returns inserted user
            return res.json({ resp: insertedData });
        });
    });
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => log.debug(`Server started on port ${PORT}`));
//# sourceMappingURL=app.js.map