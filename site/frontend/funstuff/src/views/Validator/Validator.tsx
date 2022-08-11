import { ContentCopy } from "@mui/icons-material";
import {
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

const log = getLogger("view.validator");

export interface IValidatorProps {}

export default function Validator(props: IValidatorProps) {
  const [pageName, setPageName] = useState("");


  //hit validator and get raw data back
  function getData() {
    axios
      .get("http://html5.validator.nu/", {
        params: {
          doc: "http://20.163.2.183:3000/" + pageName,
          out: "json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
        const { data } = response;
        updateOutput(JSON.stringify(data, null, 2));
        }
      }, (error) => {
        console.log(error);
        updateOutput(JSON.stringify(error, null, 2));
      });
  }

  // update document with input
  function updateOutput(str: string) {
    let outputMap = document.getElementById("outputMap");
    if (outputMap) {
      outputMap.innerText = str;
    } else {
      log.debug("Could not find outputMap!");
    }
  }

  return (
    <Grid item key="Validator">
      <Card variant="outlined" sx={{ minWidth: 200 }}>
        <CardContent sx={{ "&:last-child": { mb: 0, pb: 0 } }}>
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
            Validator
          </Typography>
          <Typography sx={{ fontSize: 18, color: "text.secondary" }}>
            https://html5.validator.nu/
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="pageName">Page Name</InputLabel>
            <Select
              labelId="pageName"
              id="pageName"
              value={pageName}
              label="Age"
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setPageName(e.target.value)}
            >
              {["Admin", "Home", ...pages].map((page: string) => {
                return (
                  <MenuItem value={pages_dict[page]} key={page}>
                    {page}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
