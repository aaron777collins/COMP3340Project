import { getByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { getConfigFileParsingDiagnostics } from "typescript";
import { getLogger } from "../../LogConfig";
import "./About.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const log = getLogger("view.about");

function About() {
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = useState({} as responseType);

  function getData(event: React.MouseEvent<HTMLButtonElement>) {
    log.debug("This is a test from about");
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
        <h1>About Us</h1>
      </header>
      <body className="App-body">
        <h2>What We Do</h2>
        <p>Fun Stuff is an e-commerce website specializing in the funky stuff you <i>wish</i> you could find at a gift shop! Whether 
          it's a Foot Stroker or a Bosnian Booze Bunker, we have it all!</p>
        <h2>The Fun Stuff Crew</h2>
        {BasicTable()}
        <h2>Location</h2>
        <p>1234 Chungarius Ave. South</p>
        <p>Windsor, ON N1A 2B3</p>
        <h2>Contact Us</h2>
        <p>	&#40;519&#41; 123-4567</p>

      </body>
    </div>
  );
}

export default About;

function createData(
  name: string,
  description: string,
  email: string,
) {
  return { name, description, email };
}

const rows = [
  createData('Aaron Collins', 'temp@peameal.bacon', 'Loves working on our backend ;)'),
  createData('Alec Mladenovic', 's', 's'),
  createData('Aleksa Vinjevic', 's', 's'),
  createData('Kevin Liu', 's', 's'),
  createData('Riley OKeefe', 's', 's'),
];

export function BasicTable() {
  return (
    <TableContainer component={Paper} className="GroupMemberTable">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Group Member</TableCell>
            <TableCell align="right">E-Mail</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.email}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}