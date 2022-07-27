import { getByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { getConfigFileParsingDiagnostics } from "typescript";
import { getLogger } from "../../LogConfig";
import logo from "../../logo.svg";
import "./Home.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const log = getLogger("view.home");

function Home() {
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = useState({} as responseType);

  function getData(event: React.MouseEvent<HTMLButtonElement>) {
    log.debug("This is a test");
    event.stopPropagation();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    fetch(process.env.REACT_APP_API_ADDRESS as string, requestOptions)
      .then((resp) => resp.json())
      .then((data: responseType) =>
        setResponse({
          resp: data.resp + " " + (response.resp ? response.resp : ""),
        })
      );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>A simple React app.....</p>
        {getCards()}
        <a
          className="App-link"
          href="about"
        >
          About
        </a>
        <form action="../../post" method="post" className="form">
          <button type="submit">Connected?</button>
        </form>
        <button type="submit" onClick={getData}>
          Test Api
        </button>
        <div>{response.resp}</div>
        <ImageList sx={{ width: 1000, height: 900 }} cols={3} rowHeight={324}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
        <h1>Just Keep Having Fun!</h1>
        <div>
            <p>At Fun Stuff our game is creativity and our goal is to give you the products you need to<br></br>
               keep your life full of joy! Whether you're impressing your friends, or rocking on your own,<br></br> 
               it's time to start living life to the fullest! Share your photos and<br></br> 
               vidoes with us and don't forget to Have Fun!!</p>
        </div>
      </header>
    </div>
  );
}
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24',
    title: 'Sign',
  },
  {
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    title: 'Nike',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    title: 'Watch',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108',
    title: 'Oil',
  },
  {
    img: 'https://images.unsplash.com/photo-1570569962804-5377da5be035',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1514411959691-a8f39b0ac8b8',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1604586376807-f73185cf5867',
    title: 'Xbox',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

export default Home;
function getCards(): React.ReactNode {
  const getDivs = () => {
    let arr = ["hello", "hi"];
    return arr.map((elem, ind) => {
      return <p key={ind}>{elem}</p>;
    });
  };
  return <>{getDivs()}</>;
}
