import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// HOW TO USE
// This is a re usable Button which you can add to your UI
//

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons(name, color, disabled) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color={color} disabled={disabled}>
        {name}
      </Button>
    </div>
  );
}
