import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ApproveButton from "./ApproveButton";
import RejectButton from "./RejectButton";

// HOW TO USE THIS COMPONENT!
// This is a re usable component for lists.
// Import the data as response.data into the props of the function
// make sure you values are the same as the Table Cell values!

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ data }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Co-Founders</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Industry</TableCell>
            <TableCell align="right">Reject</TableCell>
            <TableCell align="right">Approve</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.firstName} {row.lastName}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.industry}</TableCell>
              <TableCell align="right">
                <RejectButton />
              </TableCell>
              <TableCell align="right">
                <ApproveButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
