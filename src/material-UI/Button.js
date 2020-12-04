import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// HOW TO USE
// This is a re usable Button which you can add to your UI
// In your Component props you can add the NAME which will be the name of the button
// The color which can be "primary" || "secondary" as strings, primary will Render BLUE
// and secondary color will render RED, no color will Render Grey.
// Disabled is making the button look like it's DISABLED and its a boolen. true || false value!

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
