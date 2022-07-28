import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { getLogger } from "../../LogConfig";
import { ItemModel } from "../../Models/Item";
import { ResponseModel } from "../../Models/Response";
const log = getLogger("view.admin");

type FunctionObj = {
  name: string;
  apiPath: string;
  parameters: object;
  type: FuncType;
};

enum FuncType {
  get = "get",
  post = "post",
}

export default function Admin() {
  function updateOutput(str: string) {
    let outputMap = document.getElementById("outputMap");
    if (outputMap) {
      outputMap.innerText = str;
    } else {
      log.debug("Could not find outputMap!");
    }
  }

  const functionObjArr = [
    {
      name: "Update Items",
      apiPath: process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING + "updateItems",
      parameters: {},
      type: FuncType.post,
    },
    {
      name: "Get All Items",
      apiPath: process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING + "getAllItems",
      parameters: {},
      type: FuncType.get,
    },
    {
      name: "Reset Users",
      apiPath: process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING + "resetUsers",
      parameters: {},
      type: FuncType.post,
    },
    {
      name: "Get All Users",
      apiPath: process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING + "getAllUsers",
      parameters: {
        password: "FunStuffPass",
      },
      type: FuncType.post,
    },
    {
      name: "Add All Items (Do not use)",
      apiPath: process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING + "addAllItems",
      parameters: {},
      type: FuncType.post,
    },
  ] as FunctionObj[];

  function runFunction(funcObj: FunctionObj) {
    if (funcObj.type === FuncType.get) {
      axios.get(funcObj.apiPath).then((response) => {
        const { data } = response;
        let responseObj: ResponseModel = data as ResponseModel;
        updateOutput(JSON.stringify(responseObj.resp));
      });
    } else if (funcObj.type === FuncType.post) {
      axios.post(funcObj.apiPath, funcObj.parameters).then((response) => {
        const { data } = response;
        let responseObj: ResponseModel = data as ResponseModel;
        updateOutput(JSON.stringify(responseObj.resp));
      });
    } else {
      log.debug(`No known function type for the function ${funcObj.name}`);
    }
  }

  function getGridCards() {
    return functionObjArr.map((funcObj) => (
      <Grid item key={funcObj.name}>
        <Card sx={{ minWidth: 200 }}>
          <CardContent sx={{ "&:last-child": { mb: 0, pb: 0} }}>
            <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
              {funcObj.name}
            </Typography>
            <Typography sx={{ fontSize: 18, color: "text.secondary"}}>
              {funcObj.apiPath}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "text.secondary"}}>
              {JSON.stringify(funcObj.parameters)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large" onClick={() => runFunction(funcObj)}>
              Run
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));
  }

  return (
    <>
      <Grid container spacing={3}>
        {getGridCards()}
      </Grid>
      <Card sx={{ minWidth: 200, width: '100%' }}>
        <CardContent>
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
            Output
          </Typography>
          <Typography sx={{ fontSize: 14, width: '100%' }} id="outputMap">
            No Content yet!
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
