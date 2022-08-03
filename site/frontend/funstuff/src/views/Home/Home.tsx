import { getByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { getConfigFileParsingDiagnostics } from "typescript";
import { getLogger } from "../../LogConfig";
import "./Home.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { CssBaseline, Grid } from "@mui/material";
import { display } from "@mui/system";

export default function Home() {
  
  return (
    <body>
      <div className="homePage">  
          <div className="content">
            <h2>Fun Stuff</h2>
            <h2>Fun Stuff</h2>
          </div>
      </div>
    </body>
  );
}
