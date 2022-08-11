import cors from "cors";
import express from "express";
import { getLogger } from "./LogConfig";
import { ADMIN_USER, AuthData, AUTH_LEVEL } from "./Models/Auths";
import { ItemModel } from "./Models/Item";
import { UserLoginInfo, UserModel, UserModelSecure, UserTaken, UserUpdateInfo } from "./Models/User";
import { MongoConnection } from "./MongoConnection";
import { callFunctionWithExpressReturns } from "./MongoHelper";
import * as Data from "./Data/Data.json";

const log = getLogger("service.app");

/* Create child categories based on a parent category, effectively allowing you to create a tree of loggers when needed */
// const logApp = logModel.getChildCategory("app");

// Start express server
const app = express();
// Use json for input/output
app.use(express.json());
// Use CORS
app.use(cors());

// Ununsed --> Used to redirect back to the main page when testing backend
app.post("/post", (req: any, res: any) => {
  log.debug("Connection made. Redirecting to React");
  res.redirect("/");
});

// Basic response useful for initial debugging of the api
app.post("/api", (req: any, res: any) => {
  res.json({ resp: "Retrieved this from endpoint" });
});

// Removes all items in the database and then adds them again
app.post("/db/updateItems", async (req: any, res: any) => {
  // Creates new mongo connection
  const mongoConnection = new MongoConnection();

  const itemList = Data.Items as ItemModel[];

  // Safely reaches out to mongo and gets database context
  callFunctionWithExpressReturns(res, (db, errInside) => {
    // gets items collections from the database
    const itemData = db.collection("Items");
    // Deletes the collection
    itemData.deleteMany();
    // Inserts the new items list
    itemData.insertMany(itemList);
    // Returns the results
    return res.json({ resp: itemList });
  });
});

// DO NOT use to avoid duplicate items
// Adds all items but doesn't remove any
// This breaks the db if the items already exist
// This function is useful for breaking the backend (for testing/debugging purposes)
app.post("/db/addAllItems", async (req: any, res: any) => {
  // Creates mongo connection
  const mongoConnection = new MongoConnection();

  const itemList = Data.Items as ItemModel[];

  // Safely gets db context
  callFunctionWithExpressReturns(res, (db, errInside) => {
    // Gets items collection
    const itemData = db.collection("Items");
    // Inserts item list
    itemData.insertMany(itemList);
    // Returns results
    return res.json({ resp: itemList });
  });
});

// Returns all the items in the database
app.get("/db/getAllItems", async (req: any, res: any) => {
  // New mongo connection
  const mongoConnection = new MongoConnection();

  // Safely gets database context
  callFunctionWithExpressReturns(res, (db, errInside) => {
    // Gets items collection
    const itemData = db.collection("Items");
    // Searches items (with empty filter) to return all items
    itemData.find().toArray((err: any, results: any) => {
      // Returns all items
      return res.json({ resp: results });
    });
  });
});

// Gets the user authentication level given a username and password
app.post("/db/getUserAuth", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  // Gets the params object
  const userInfo: UserLoginInfo = req.body;

  // Checks that theres a username and password
  if (!userInfo.username || !req.body.password) {
    return res.status(400).send({
      message: "Missing username or password!",
    });
  }

  // Safely gets db context
  callFunctionWithExpressReturns(res, (db, errInside) => {
    // Gets users collection
    const gatheredData = db.collection("Users");

    // Searches the users collection for an object with the username and password parameters
    gatheredData
      .find({ username: userInfo.username, password: userInfo.password })
      .toArray((err: any, results: any) => {
        // If there are results
        if (results.length > 0) {
          // Return back their auth level
          if (results[0].username !== ADMIN_USER) {
            return res.json({ auth: AUTH_LEVEL.regular } as AuthData);
          } else {
            return res.json({ auth: AUTH_LEVEL.admin } as AuthData);
          }
        } else {
          // Otherwise, it was rejected, return a rejected one
          return res.json({ auth: AUTH_LEVEL.rejected } as AuthData);
        }
      });
  });
});

// Checks if a username exists
app.post("/db/checkUsername", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  const userInfo: UserLoginInfo = req.body;

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

  callFunctionWithExpressReturns(res, (db, errInside) => {
    const gatheredData = db.collection("Users");

    // Searches for username
    gatheredData
      .find({ username: userInfo.username})
      .toArray((err: any, results: any) => {
        if (results.length > 0) {
          // If results, return object with taken true
          return res.json({ taken: true} as UserTaken);
        } else {
          // Otherwise, taken is false
          return res.json({ taken: false} as UserTaken);
        }
      });
  });
});


// Gets the user's info (requires username and pass)
app.post("/db/getUserInfo", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  const userInfo: UserLoginInfo = req.body;

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

  callFunctionWithExpressReturns(res, (db, errInside) => {
    const gatheredData = db.collection("Users");

    // Find object with the username
    gatheredData
      .find({ username: userInfo.username})
      .toArray((err: any, results: any) => {
        if (results.length > 0) {
          // If found, return back the username and email
          return res.json({ username: results[0].username, email: results[0].email} as UserModelSecure);
        } else {
          // else, no username found. Return error
          return res.status(403).send({
            message: "Incorrect username!",
          });
        }
      });
  });
});

// Updates a user's info
app.post("/db/updateUser", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  const userInfo: UserUpdateInfo = req.body;

  // Checks that all params exist
  if (
    !userInfo.username ||
    !userInfo.password ||
    !userInfo.email ||
    !userInfo.newUsername
  ) {
    return res.status(400).send({
      message: "Missing username, newUsername, password or email!",
    });
  }

  callFunctionWithExpressReturns(res, (db, errInside) => {
    const gatheredData = db.collection("Users");

    // Finds an object with the given username nad password
    gatheredData
      .find({ username: userInfo.username, password: userInfo.password })
      .toArray((err: any, results: any) => {
        // If found, create a new object with the new username and email
        if (results.length > 0) {
          const newUserData = {
            username: userInfo.newUsername,
            password: userInfo.password,
            email: userInfo.email,
          } as UserModel;
          // Delete the old one
          gatheredData.deleteOne({
            username: userInfo.username,
            password: userInfo.password,
          });
          // Insert new one
          gatheredData.insertOne(newUserData, (errReturn: any, result: any) => {
            if (errReturn) {
              return res.status(500).send({
                message: "Error inserting user data",
                attemptedData: newUserData
              });
            }
            return res.json({ resp: newUserData });
          });
        } else {
          // Otherwise, it was incorrect username and pass
          return res.status(403).send({
            message: "Incorrect username or password!",
          });
        }
      });
  });
});

// Resets the user's collection to a default value
app.post("/db/resetUsers", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  // Gets safe db context
  callFunctionWithExpressReturns(res, (db, errInside) => {
    // parses post input

    // Gets user collection
    const userData = db.collection("Users");
    // Creates default object
    const insertedData = {
      username: "admin",
      password: "FunStuffPass123!",
      email: "colli11s@uwindsor.ca",
    } as UserModel;
    // Deletes all users
    userData.deleteMany();
    // Inserts the default admin user
    userData.insertOne(insertedData, (err: any, result: any) => {
      return res.json({ resp: insertedData });
    });
  });
});

// Returns all user info
app.post("/db/getAllUsers", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  // Ensures the password entered is the admin pass
  if (req.body.password !== "FunStuffPass123!") {
    return res.status(403).send({
      message: "Incorrect password!",
    });
  }

  callFunctionWithExpressReturns(res, (db, errInside) => {
    const userData = db.collection("Users");
    // Gets all user objects
    userData.find().toArray((err: any, results: any) => {
      // Returns them in an object
      return res.json({ resp: results });
    });
  });
});

// Returns selected user (requires admin pass)
app.post("/db/findUser", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

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

  callFunctionWithExpressReturns(res, (db, errInside) => {
    const userData = db.collection("Users");
    // Finds the user with the given username
    userData
      .find({ username: req.body.username })
      .toArray((err: any, results: any) => {
        // Returns back all info
        return res.json({ resp: results });
      });
  });
});

// Inserts a user in the db
app.post("/db/insertUser", async (req: any, res: any) => {
  const mongoConnection = new MongoConnection();

  const response = "No user added";

  callFunctionWithExpressReturns(res, (db, errInside) => {
    // parses post input
    const inputData: UserModel = req.body;

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
    } as UserModel;
    // Inserts into the users collection
    userData.insertOne(insertedData, (err: any, result: any) => {
      // Returns inserted user
      return res.json({ resp: insertedData });
    });
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => log.debug(`Server started on port ${PORT}`));
