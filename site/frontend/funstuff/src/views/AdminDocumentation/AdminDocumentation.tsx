import { getByDisplayValue } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { getConfigFileParsingDiagnostics } from "typescript";
import { getLogger } from "../../LogConfig";
import "./AdminDocumentation.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const log = getLogger("view.adminDocumentation"); /** Retrieves the logger*/

export interface IAdminDocumentationComponentProps {

}

export default function AdminDocumentation(props: IAdminDocumentationComponentProps) {/** Export the function by default*/
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = useState({} as responseType); {/** useState react hook*/}

  return ( // return html
    <div className="AdminDocumentation">
      <div className="AdminDocumentation-header">
        <h1>Admin Documentation</h1>
      </div>
      <div className="AdminDocumentation-body">
        <h2>Functions / Commands</h2>
        {BasicTable()} {/** Table created with MaterialUI*/}
        <br></br>
        <Button href="./admin" variant="contained">Click here to return to the Admin page</Button>
      </div>
    </div>
  );
}

function createData( /** format for the row data*/
  name: string,
  description: string,
) {
  return { name, description };
}

const rows = [ /** Row data*/
  createData('Update Items', 'Click the "RUN" button to update the products with the product data stored in the "Data.json" file in our backend/src/Data/ folder.'),
  createData('Get All Items', 'Click the "RUN" button to return to the user the a list of the products we have posted. Mainly used for debugging.'),
  createData('Reset Users', 'Click the "RUN" button to delete all users, and re-adds the admin account.'),
  createData('Get All Users', 'Click the "RUN" button to return all of our users, including their credentials and access type (admin or normal user).'),
  createData('Add All Items', 'DISCLAIMER: Not for practical use, mainly used to insantiate the database, and to trigger crashes in case something goes wrong.'),
];

export function BasicTable() { /** format the table */
  return (
    <TableContainer component={Paper} className="GroupMemberTable">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Function</TableCell>
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