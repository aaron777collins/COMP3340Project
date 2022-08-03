import { getByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { getConfigFileParsingDiagnostics } from "typescript";
import { getLogger } from "../../LogConfig";
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
        <h1 className="animate-character">Fun Stuff</h1>
        <h2>A small hint of what we offer:</h2>
        <ImageList sx={{ width: 1000, height: 900 }} cols={3} rowHeight={328}>
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
        <div className="center">
            <p>At Fun Stuff our game is creativity and our goal is to give you the products you need to keep<br></br>
               your life full of joy! Whether you're impressing your friends, or rocking on your own, it's time to<br></br> 
               start living life to the fullest! Share your photos and videos with us and don't forget to Have Fun!!<br></br>
            </p>
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
    img: 'https://images.unsplash.com/photo-1604586376807-f73185cf5867',
    title: 'Xbox',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f',
    title: 'Guitar',
  },
  {
    img: 'https://images.unsplash.com/photo-1570569962804-5377da5be035',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592',
    title: 'Yoda',
  },
  {
    img: 'https://images.unsplash.com/photo-1621478374422-35206faeddfb',
    title: 'Anime',
  },
  {
    img: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d',
    title: 'Board',
  },
  {
    img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    title: 'Headphones',
  },
  {
    img: 'https://images.unsplash.com/photo-1552318965-6e6be7484ada',
    title: 'Soccer',
  },
  {
    img: 'https://images.unsplash.com/photo-1506359585186-16ff29581308',
    title: 'Pool',
  },
];

export default Home;
