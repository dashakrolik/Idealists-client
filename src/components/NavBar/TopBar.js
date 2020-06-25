import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import "./TopBar.css";
import { withRouter, Link } from "react-router-dom";
import logo from "../../res/logo_horizontal_white.png";

/** @jsx jsx */
import Grid from "@material-ui/core/Grid";
import { jsx } from "@emotion/core";
const TopBar = (props) => {
  const [history, location, window] = useState({});

  const [authState] = useState({});

  const { classes } = props;

  return (
    <AppBar>
      <Toolbar className="topBar">
        {/* <Link
          to={
            props.authState.loggedIn &&
            localStorage.currentUserJwt &&
            ((props.authState.user.role !== undefined &&
              props.authState.user.role === "user") ||
              props.authState.user.role === "expert" ||
              props.authState.user.role === "specialist" ||
              props.authState.user.role === "admin")
              ? "/MyIdea/new"
              : "/"
          }
        > */}
        <img src={logo} alt="Logo" style={logoStyle} />
        {/* </Link> */}

        <Grid container direction="row" justify="flex-end" alignItems="center">
          {!localStorage.currentUserJwt || !props.authState.loggedIn ? (
            <Button
              color="inherit"
              onClick={() => props.history.push("/MyIdea/login")}
            >
              Login
            </Button>
          ) : null}
          {!props.authState.loggedIn ? (
            <Button
              color="inherit"
              onClick={() => props.history.push("/MyIdea")}
            >
              Sign Up
            </Button>
          ) : null}
          {!props.authState.user ? null : props.authState.loggedIn &&
            localStorage.currentUserJwt &&
            props.authState.user.role === "user" ? (
            <Button
              color="inherit"
              onClick={() => props.history.push("/MyIdea/dashboard")}
            >
              Dashboard
            </Button>
          ) : null}
          {!props.authState.user ? null : props.authState.loggedIn &&
            localStorage.currentUserJwt &&
            props.authState.user.role === "admin" ? (
            <Button
              color="inherit"
              onClick={() => props.history.push("/AdminDashboard")}
            >
              Admin Dashboard
            </Button>
          ) : null}
          {!props.authState.user ? null : props.authState.loggedIn &&
            localStorage.currentUserJwt &&
            (props.authState.user.role === "expert" ||
              props.authState.user.role === "admin") ? (
            <Button
              color="inherit"
              onClick={() => props.history.push("/Investors/dashboard")}
            >
              Investor Dashboard
            </Button>
          ) : null}
          {!props.authState.user ? null : props.authState.loggedIn &&
            localStorage.currentUserJwt &&
            (props.authState.user.role === "specialist" ||
              props.authState.user.role === "admin") ? (
            <Button
              color="inherit"
              onClick={() => props.history.push("/Specialist/dashboard")}
            >
              Specialist Dashboard
            </Button>
          ) : null}
          {!props.authState.user ? null : props.authState.loggedIn &&
            localStorage.currentUserJwt &&
            props.authState.user.role === "user" ? (
            <Button
              color="inherit"
              onClick={() => props.history.push("/MyIdea/new")}
            >
              New Idea
            </Button>
          ) : null}
          {props.authState.loggedIn === true &&
          localStorage.currentUserJwt !== null ? (
            <Button
              color="inherit"
              onClick={() =>
                props.logout() || props.history.push("/MyIdea/login")
              }
            >
              Logout
            </Button>
          ) : null}
          {!localStorage.currentUserJwt || !props.authState.loggedIn ? (
            <Button
              color="inherit"
              onClick={() => props.history.push("/InvestorStart")}
            >
              Expert Login
            </Button>
          ) : null}
          {!localStorage.currentUserJwt || !props.authState.loggedIn ? (
            <Button
              color="inherit"
              onClick={() => props.history.push("/SpecialistStart")}
            >
              Specialist Login
            </Button>
          ) : null}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(TopBar);

var logoStyle = {
  width: 200,
};
