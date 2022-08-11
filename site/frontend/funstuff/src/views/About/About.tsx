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

const log = getLogger("view.about");  /** Retrieves the logger*/

export interface IAboutComponentProps {

}

export default function About(props: IAboutComponentProps) { /** Export the function by default*/
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = useState({} as responseType); {/** useState react hook*/}
  // return some information for the About Us page, all written in HTML5
  return (
    <div className="About">
      <div className="About-header">  {/** Page header*/}
        <h1>About Us</h1>
      </div>
      <div className="About-body">  {/** Page body containing the main content of the page*/}
        <h2>What We Do</h2>
        <p>Fun Stuff is an e-commerce website specializing in the funky stuff you <i>wish</i> you could find at a gift shop. Whether 
          it's an Aleksa bobble head or a Bosnian Booze Bunker, we have it all!</p>
        <p>Find our fantastic products on our products page, add them to your cart, share it with your friends, and then checkout in no time.</p>

        <h2>Our Mission</h2>
        <p>In today's e-commerce market of trying to squeeze every last penny out of the customer, funstuff.com tries not to <i>convince</i>
          you our products are quality, but to <i>show</i> you quality products at a reasonable price, letting your intrigue guide you
          to where your heart desires.</p>

        <h2>The Fun Stuff Crew</h2>
        {BasicTable()}                    {/** Table created with MaterialUI*/}
        <h2>Headquarters</h2>
        <p>738 Chungus Ave. West</p>
        <p>Windsor, ON N9A 1B2</p>
        <div id="map">                    {/** Calls the Google Maps API to return a map at the specified latitude and longitude*/}
          <iframe id="mapiframe" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCzptUX6vEfYLfAb6eNkvCUS_dZgaUEJxw&q=42.303998784,-83.059499762"></iframe>
          <img id="hqimg" src="/companyHQ.jpg" alt="Our Company Headquarters"></img>  {/** company hq image*/}
        </div>
        <h2>Contact Us</h2>
        <p>If you have any problems, inquiries, or feedback, please reach out to us at the following outlets:</p>
        <p>Phone: &#40;519&#41; 123-4567</p>
        <p>E-mail: info@funstuff.com</p>

      </div>
    </div>
  );
}

function createData(    /** format for the row data*/
  name: string,
  description: string,
) {
  return { name, description };
}

const rows = [  /** Row data*/
  createData('Aaron Collins', 'Loves working on our backend ;)'),
  createData('Alec Mladenovic', 'Loves watching anime x3'),
  createData('Aleksa Vignjevic', 'Strep throat baddie'),
  createData('Kevin Liu', 'Playing Valorant'),
  createData('Riley OKeefe', '80% bathroom breaks'),
];

export function BasicTable() {  /** format the table */
  return (
    <TableContainer component={Paper} className="GroupMemberTable">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Group Member</TableCell>
            <TableCell align="left">Description</TableCell>
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
              <TableCell align="left">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}