import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";
import ApproveRejectButton from "./ApproveRejectButton";

// HOW TO USE THIS COMPONENT!
// This is a re usable component for lists.
// Import the data as response.data into the props of the function
// make sure you values are the same as the Table Cell values!

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({
  data,
  authState,
  setCofounders,
  coFounders,
}) {
  const classes = useStyles();

  const handleClick = (id) => {
    console.log(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Profile</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Industry</TableCell>
            <TableCell align="right">Reject</TableCell>
            <TableCell align="right">Approve</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell gn="right">
                {row.firstName + " " + row.lastName}
              </TableCell>
              <TableCell gn="right">
                <Link to={`/Cofounder/dashboard/${row.id}/profile`}>
                  Show profile
                </Link>
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.industry}</TableCell>
              <TableCell align="right">
                <ApproveRejectButton
                  coFounders={coFounders}
                  setCofounders={setCofounders}
                  id={row.id}
                  authState={authState}
                  isApproved={false}
                />
              </TableCell>
              <TableCell align="right">
                <ApproveRejectButton
                  coFounders={coFounders}
                  setCofounders={setCofounders}
                  id={row.id}
                  authState={authState}
                  isApproved={true}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
