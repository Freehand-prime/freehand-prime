// React, Router
import React from "react";

// MUI
import { makeStyles } from "@material-ui/core/styles";

// MUI styling
const useStyles = makeStyles({
  root: {
    marginTop: 40,
    padding: 20,
    textAlign: "center",
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default function Footer() {
  // Hook
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      Copyright &copy; 2021 Freehand Cards. All Rights Reserved
    </footer>
  );
}
