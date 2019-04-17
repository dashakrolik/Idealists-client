import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { useEffect, useState } from 'react';
import './TopBar.css'
import {withRouter} from 'react-router-dom'
import logo from '../../res/logo_horizontal_white.png';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

const TopBar = (props) => {

const [history, location, window] = useState({});
const myStorage = localStorage

const [authState] = useState({})

const {classes} = props
console.log(localStorage)
console.log(props.logout)
return (
    
        <AppBar>
            <Toolbar className="topBar">
                <img src={logo} alt='Logo' style={logoStyle}/>
                <Grid container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                >
                {
                !localStorage.currentUserJwt || !props.authState.loggedIn  ? 
                <Button color="inherit" onClick={() => props.history.push('/MyIdea/login')}>Login</Button> : null
                }
                {
                !props.authState.loggedIn ?
                <Button color="inherit" onClick={() => props.history.push('/MyIdea')}>Sign Up</Button> : null
                }
                {
                props.authState.loggedIn && localStorage.currentUserJwt ? 
                <Button color="inherit" onClick={() => props.history.push('/MyIdea/dashboard')}>Dashboard</Button> : null
                }
                {
                 props.authState.loggedIn && localStorage.currentUserJwt ?   
                <Button color="inherit" onClick={() => props.history.push('/MyIdea/new')}>New Idea</Button> : null
                }
                {
                props.authState.loggedIn === true && localStorage.currentUserJwt !== null ? 
                <Button color="inherit" onClick={() => props.logout() && props.history.push('MyIdea/login')}>Logout</Button> : null
                }
               </Grid>
            
            </Toolbar>
        </AppBar>
    
    )
}

export default withRouter(TopBar) 

var logoStyle = {
  width: 200,
//   marginLeft: 300
}

