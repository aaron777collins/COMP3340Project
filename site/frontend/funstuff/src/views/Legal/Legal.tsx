import * as React from "react";
import { useState } from "react";
import { getLogger } from "../../LogConfig";
import logo from "../../logo.svg";
import "./Legal.css";
import { Button, Card, CardActionArea, CardActions, CardContent, CssBaseline, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Used for adding parameters to the Legal tag
export interface ILegalProps {}

const log = getLogger("view.legal");

export default function Legal(props: ILegalProps) {
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = useState({} as responseType);

  return (
    <div className="Legal">
      <header className="Legal-header"></header>
      <body className="Legal-body">
        <h1>Legal Information</h1>
        <div className="Legal-questions">
          <div>
            You can find all of our legal information at the following pages:<br></br><br></br>

            <div className="buttonsLanding">
                <CardActions>
                  <Button component={Link} sx={{fontSize:"3vmin"}} to="/terms" variant="contained" color="secondary" className="buttonsLandingButton">
                    Terms and Conditions 📃
                  </Button>
                  <Button component={Link} sx={{fontSize:"3vmin"}} to="/about" variant="contained" color="secondary" className="buttonsLandingButton">
                    Privacy Policy 🔍
                  </Button>
                  <Button component={Link}  sx={{fontSize:"3vmin"}} to="/faq" variant="contained" color="secondary" className="buttonsLandingButton">
                    Refund Policy 🧳📦
                  </Button>
                </CardActions>
              </div>
          </div>
        </div>
      </body>
    </div>
  );
}
