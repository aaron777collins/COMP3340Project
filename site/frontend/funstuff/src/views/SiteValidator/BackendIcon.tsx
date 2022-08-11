import axios from "axios";
import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { getLogger } from "../../LogConfig";

const log = getLogger("view.sitevalidator");

export interface IBackendIconProps {
  endPoint: string;
  params: {};
  addOutput: Function;
  refreshToggler: boolean;
  wait: number;
  type: string;
}

enum State {
  ERROR = 0,
  WORKING = 1,
  LOADING = 2,
}

export default function BackendIcon(props: IBackendIconProps) {
  const [error, setError] = useState(State.LOADING);

  //get data type
  async function getDataSingle() {
    let operation = axios.get;
    if (props.type === "get") {
      operation = axios.get;
    } else if (props.type === "post") {
      operation = axios.post;
    } else {
      log.debug("No function found!");
      return;
    }
    //await reponse from validator 
    await operation(
      process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING + props.endPoint,
      props.params
    ).then(
      (response: { status?: any; data?: any }) => {
        const { data } = response;
        console.log(data);
        if (response.status === 200 && data.resp.length > 0) {
          setError(State.WORKING);
          props.addOutput(JSON.stringify(data, null, 2));
        } else {
          setError(State.ERROR);
        }
      },
      (error: any) => {
        console.log(error);
        setError(State.ERROR);
        props.addOutput(JSON.stringify(error, null, 2));
      }
    );
  }

  //on load validate site
  useEffect(() => {
    setError(State.LOADING);
    // getDataSingle();
    setTimeout(getDataSingle, props.wait);
  }, [props.refreshToggler]);

  if (error === State.ERROR) {
    return <ErrorIcon sx={{ verticalAlign: "bottom" }} />;
  } else if (error === State.WORKING) {
    return <CheckCircleIcon sx={{ verticalAlign: "bottom" }} />;
  } else {
    return <CircularProgress color="inherit" size={18} sx={{ ml: 0.5 }} />;
  }
}
