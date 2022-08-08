import { getByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { getConfigFileParsingDiagnostics } from "typescript";
import { getLogger } from "../../LogConfig";
import "./Home.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button, Card, CardActionArea, CardActions, CardContent, CssBaseline, Grid, Typography } from "@mui/material";
import { display } from "@mui/system";
import axios from "axios";
import { Link } from "react-router-dom";


interface WeatherResponseObject {
  current: {
    condition: {
      text: string
    },
    feelslike_c: number
  };
  location: object;
}

export default function Home() {

  const [loading, setLoading] = useState(false);

  // Weather API is through rapid API's
  const options = {
    method: 'GET',
    url: String(process.env.REACT_APP_RAPID_API_ADDRESS),
    params: {
      q: 'N8P'
    },
    headers: {
      'X-RapidAPI-Key': String(process.env.REACT_APP_RAPID_API_KEY),
      'X-RapidAPI-Host': String(process.env.REACT_APP_RAPID_API_HOST),
    }
  };

  const initialWeathersObject: WeatherResponseObject = {
    current: {
      condition: {
        text: 'Uncomment effect line (API not being called)'
      },
      feelslike_c: 25
    },
    location: {

    }
  };

  const [weatherData, setWeatherData] = useState(initialWeathersObject);

  function getWeather() {
    setLoading(true);

    console.log(process.env.REACT_APP_RAPID_API_ADDRESS, process.env.REACT_APP_RAPID_API_KEY, process.env.REACT_APP_RAPID_API_HOST)

    axios.request(options).then(function (response) {
      setWeatherData(response.data);
    }).catch(function (error) {
      console.error(error);
    });

    setLoading(false);
  }

  //useEffect(getWeather, []);
  
  return (
      <div className="homePage">  
          
          <Typography sx={{marginTop: '20px', fontSize:'calc(60px + 2vmin)' }} gutterBottom className="content">
                      🎉<b>FunStuff.</b>
          </Typography>

          <Typography sx={{marginTop: '20px', fontSize:'calc(20px + 2vmin)' }} gutterBottom className="content">
                      {}
          </Typography>

          <Card sx={{
            backgroundColor: '#1976d2',
            padding: '20px 20px'
          }} elevation={12} className="welcomeCard">
            <CardActionArea>
                  <CardContent sx={{alignContent: 'center'}}>
                        <Typography sx={{fontSize: 'calc(10px + 2vmin)'}} gutterBottom component="div">
                          At 🎉FunStuff. We (the creators) sell the stuff we think is fun. So you, our beloved customer, can 
                          skip the wait and get all these goodies to <b>your door.</b>
                        </Typography>
                        <Typography sx={{fontSize: 'calc(10px + 2vmin)'}} gutterBottom component="div">
                          Wondering how the weather is at our offices🌞? <div style={{color: 'rgb(251, 255, 0)'}}>Its currently: {weatherData.current.condition.text.toLocaleLowerCase()} and {weatherData.current.feelslike_c}°C in Windsor!</div>
                        </Typography>
                        <Typography sx={{fontSize: 'calc(10px + 2vmin)'}} >
                          <i>Some pages to checkout ➡️</i>
                        </Typography>
                </CardContent>
              </CardActionArea>
              <div className="buttonsLanding">
                <CardActions>
                  <Button component={Link} to="/products" variant="contained" sx={{backgroundColor: '#001646'}} className="buttonsLandingButton">
                    Products
                  </Button>
                  <Button component={Link} to="/about" variant="contained" sx={{backgroundColor: '#001646'}} className="buttonsLandingButton">
                    About Us
                  </Button>
                  <Button component={Link} to="/faq" variant="contained" sx={{backgroundColor: '#001646'}} className="buttonsLandingButton">
                    FAQ
                  </Button>
                </CardActions>
              </div>
          </Card>

      </div>
  );
}
