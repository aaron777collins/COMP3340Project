import axios from "axios";
import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export interface ISiteIconProps {
  page: string;
  addOutput: Function;
  refreshToggler: boolean;
  wait: number;
}

enum State {
   ERROR=0,
   WORKING=1,
   LOADING=2,
}

export default function SiteIcon(props: ISiteIconProps) {

    const [error, setError] = useState(State.LOADING);

    //hit backend and await validator response
  async function getDataSingle() {
    await axios
      .get("http://html5.validator.nu/", {
        params: {
          doc: "http://20.163.2.183:3000/" + props.page,
          out: "json",
        },
      })
      .then(
        (response) => {
          const { data } = response;
          if (response.status === 200) {
            if (data && data.messages && data.messages.length < 1) {
                setError(State.WORKING);
            } else {
                setError(State.ERROR);
            }
            props.addOutput(JSON.stringify(data, null, 2));
          } else {
            setError(State.ERROR);
          }
        },
        (error) => {
          console.log(error);
          setError(State.ERROR);
          props.addOutput(JSON.stringify(error, null, 2));
        }
      );
  }

  //on component load validate site
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
    return <CircularProgress color="inherit" size={18} sx={{ml: 0.5}}/>;
  }
}
