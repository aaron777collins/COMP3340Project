import cors from "cors";
import express from "express";
import { getLogger } from "./LogConfig";
import { ADMIN_USER, AuthData, AUTH_LEVEL } from "./Models/Auths";
import { ItemModel } from "./Models/Item";
import { UserLoginInfo, UserModel } from "./Models/User";
import { MongoConnection } from "./MongoConnection";
import { callFunctionWithExpressReturns } from "./MongoHelper";
import * as Data from "./Data/Data.json";

const log = getLogger("service.app");

/* Create child categories based on a parent category, effectively allowing you to create a tree of loggers when needed */
// const logApp = logModel.getChildCategory("app");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/post", (req: any, res: any) => {
  log.debug("Connection made. Redirecting to React");
  res.redirect("/");
});

app.post("/api", (req: any, res: any) => {
  res.json({ resp: "Retrieved this from endpoint" });
});

app.post("/db/updateItems", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  const itemList = Data.Items as ItemModel[];

  callFunctionWithExpressReturns(res, (db, errInside) => {
    const itemData = db.collection("Items");
    itemData.deleteMany();
    itemData.insertMany(itemList);
    return res.json({ resp: itemList });
  });
});

// DO NOT use to avoid duplicate items
app.post("/db/addAllItems", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  const itemList = Data.Items as ItemModel[];

  callFunctionWithExpressReturns(res, (db, errInside) => {
    const itemData = db.collection("Items");
    itemData.insertMany(itemList);
    return res.json({ resp: itemList });
  });
});

app.get("/db/getAllItems", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  callFunctionWithExpressReturns(res, (db, errInside) => {
    const itemData = db.collection("Items");
    itemData.find().toArray((err: any, results: any) => {
      return res.json({ resp: results });
    });
  });
});

app.post("/db/getUserAuth", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  const userInfo: UserLoginInfo = req.body;

  if (!userInfo.username || !req.body.password) {
    return res.status(400).send({
      message: "Missing username or password!",
    });
  }

  callFunctionWithExpressReturns(res, (db, errInside) => {
    const gatheredData = db.collection("Users");

    gatheredData
      .find({ username: userInfo.username, password: userInfo.password })
      .toArray((err: any, results: any) => {
        if (results.length > 0) {
          if (results[0].username !== ADMIN_USER) {
            return res.json({ auth: AUTH_LEVEL.regular } as AuthData);
          } else {
            return res.json({ auth: AUTH_LEVEL.admin } as AuthData);
          }
        } else {
          return res.json({ auth: AUTH_LEVEL.rejected } as AuthData);
        }
      });
  });
});

app.post("/db/resetUsers", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  callFunctionWithExpressReturns(res, (db, errInside) => {
    // parses post input

    const userData = db.collection("Users");
    const insertedData = {
      username: "admin",
      password: "FunStuffPass",
      email: "colli11s@uwindsor.ca",
    } as UserModel;
    userData.deleteMany();
    userData.insertOne(insertedData, (err: any, result: any) => {
      return res.json({ resp: insertedData });
    });
  });
});

app.post("/db/getAllUsers", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  if (req.body.password !== "FunStuffPass") {
    return res.status(403).send({
      message: "Incorrect password!",
    });
  }

  callFunctionWithExpressReturns(res, (db, errInside) => {
    const userData = db.collection("Users");
    userData.find().toArray((err: any, results: any) => {
      return res.json({ resp: results });
    });
  });
});

app.post("/db/insertUser", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  const response = "No user added";

  callFunctionWithExpressReturns(res, (db, errInside) => {
    // parses post input
    const inputData: UserModel = req.body;

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
    } as UserModel;
    userData.insertOne(insertedData, (err: any, result: any) => {
      return res.json({ resp: insertedData });
    });
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => log.debug(`Server started on port ${PORT}`));
