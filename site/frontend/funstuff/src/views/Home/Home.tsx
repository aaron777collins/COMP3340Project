import { getByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { getConfigFileParsingDiagnostics } from "typescript";
import { getLogger } from "../../LogConfig";
import "./Home.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button, Card, CardActionArea, CardActions, CardContent, CssBaseline, Grid, Typography } from "@mui/material";
import { display } from "@mui/system";

export default function Home() {
  
  return (
    <body>
      <div className="homePage">  
          
          <Typography sx={{marginTop: '20px', fontSize:'calc(60px + 2vmin)' }} gutterBottom className="content">
                      🎉FunStuff.
          </Typography>

          <Card sx={{
            backgroundColor: '#1976d2',
            padding: '20px 20px'
          }} elevation={12} className="welcomeCard">
            <CardActionArea>
                  <CardContent sx={{alignContent: 'center'}}>
                      <Typography sx={{fontSize: 'calc(10px + 2vmin)'}} gutterBottom component="div">
                          At 🎉FunStuff. We (the creators) sell the stuff we think is fun. So you, our beloved customer, can 
                          skip the wait and get all this to your door.
                        </Typography>
                        <Typography sx={{fontSize: 'calc(10px + 2vmin)'}} >
                          <i>Some pages to checkout ➡️</i>
                        </Typography>
                </CardContent>
              </CardActionArea>
              <div className="buttonsLanding">
                <CardActions>
                  <Button variant="contained" sx={{backgroundColor: '#001646'}} className="buttonsLandingButton">
                    Products
                  </Button>
                  <Button variant="contained" sx={{backgroundColor: '#001646'}} className="buttonsLandingButton">
                    About Us
                  </Button>
                  <Button variant="contained" sx={{backgroundColor: '#001646'}} className="buttonsLandingButton">
                    FAQ
                  </Button>
                </CardActions>
              </div>
          </Card>

      </div>
    </body>
  );
}
