import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import { getLogger } from "../../LogConfig";
const log = getLogger("view.admin");

const functionObjArr = [{
    name: "getAllItems",
    apiPath: "/db/getAllItems"
}] as FunctionObj[];

type FunctionObj = {
    name: string,
    apiPath: string,
    parameters: object
}

export default function Admin() {
  function getGridCards() {
    for (let funcObj in functionObjArr) {
      return (
        <Grid item xs={3}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 18 }}>Word of the Day</Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      );
    }
  }

  return (
    <Grid container spacing={2}>
      {getGridCards()}
    </Grid>
  );
}
