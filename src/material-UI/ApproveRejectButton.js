import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { baseUrl } from "../constants";
import request from "superagent";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons(props) {
  const classes = useStyles();

  const clickHandler = () => {
    if (props.authState.loggedIn)
      request
        .put(`${baseUrl}/users/cofounders/${props.id}`, {
          approved: props.approved,
        })
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => {
          console.log(res);
        });
    else props.history.replace("/login");
  };

  console.log(props);
  console.log(props.coFounders);
  console.log(props.coFounders);
  console.log(props.coFounders);
  console.log(props.coFounders);
  console.log(props.coFounders);

  return (
    <div className={classes.root}>
      <Button
        onClick={() => clickHandler()}
        variant="contained"
        color={props.approved ? "primary" : "secondary"}
      >
        {props.approved ? "approve" : "reject"}
      </Button>
    </div>
  );
}
