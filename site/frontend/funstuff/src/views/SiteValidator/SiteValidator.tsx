import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { getLogger } from "../../LogConfig";
import { pages, pages_dict } from "../Navbar/Navbar";
import BackendIcon from "./BackendIcon";
import SiteIcon from "./SiteIcon";

const log = getLogger("view.sitevalidator");

export interface ISiteValidatorProps {}

const extendedPages = ["Admin", "Home", ...pages];

export default function Validator(props: ISiteValidatorProps) {
  const [refreshToggler, setRefreshToggler] = useState(false);

  function getData() {
    updateOutput("");
    // refreshes the components
    setRefreshToggler(!refreshToggler);
  }

  function updateOutput(str: string) {
    let outputMap = document.getElementById("outputMap");
    if (outputMap) {
      outputMap.innerText = str;
    } else {
      log.debug("Could not find outputMap!");
    }
  }

  function addOutput(str: string) {
    let outputMap = document.getElementById("outputMap");
    if (outputMap) {
      outputMap.innerText = outputMap.innerText + " | " + str;
    } else {
      log.debug("Could not find outputMap!");
    }
  }

  return (
    <Grid item key="Validator">
      <Card variant="outlined" sx={{ minWidth: 200 }}>
        <CardContent sx={{ "&:last-child": { mb: 0, pb: 0 } }}>
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
            Aaron's God Tier Site Validator
          </Typography>
          <Typography sx={{ fontSize: 18, color: "text.secondary" }}>
            https://html5.validator.nu/, {process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING}
          </Typography>
          <Box sx={{ mt: 2 }}>
            {extendedPages.map((page: string, index: number) => {
              return (
                <div key={page}>
                  <Typography>
                    {page}{" "}
                    <SiteIcon
                      page={page}
                      addOutput={addOutput}
                      refreshToggler={refreshToggler}
                      wait={index * 500}
                    />
                  </Typography>
                </div>
              );
            })}
            <div key={"getAllItems"}>
              <Typography>
                Items Endpoint&nbsp;
                <BackendIcon
                  endPoint="getAllItems"
                  params={{}}
                  addOutput={addOutput}
                  refreshToggler={refreshToggler}
                  wait={200}
                  type="get"
                />
              </Typography>
            </div>
            <div key={"getAllUsers"}>
              <Typography>
                Users Endpoint&nbsp;
                <BackendIcon
                  endPoint="getAllUsers"
                  params={{password: "FunStuffPass123!"}}
                  addOutput={addOutput}
                  refreshToggler={refreshToggler}
                  wait={250}
                  type="post"
                />
              </Typography>
            </div>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            onClick={getData}
          >
            Run
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
