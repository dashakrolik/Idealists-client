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

const TopBar = (props) => {

const [history, location, window] = useState({});
const myStorage = localStorage

const [authState] = useState({})

const {classes} = props

return (
    <AppBar>
        <Toolbar className="topBar">

        <img src={logo} alt='Logo' style={logoStyle}/>
        <div className="menu" style={{ flex: 1 }} >
            {
            !props.authState.loggedIn ? 
            <Button color="inherit" onClick={() => props.history.push('/MyIdea/login')}>Login</Button> : null
            }
            {
            !props.authState.loggedIn ?
            <Button color="inherit" onClick={() => props.history.push('/MyIdea')}>Sign Up</Button> : null
            }
            {
            props.authState.loggedIn ? 
            <Button color="inherit" onClick={() => props.history.push('/MyIdea/dashboard')}>Dashboard</Button> : null
            }
            {
            <Button color="inherit" onClick={() => props.history.push('/MyIdea/new')}>New Idea</Button>
            }
            {
            props.authState.loggedIn ? 
            <Button color="inherit" onClick={() => props.logout}>Logout</Button> : null
            }
        </div>
        </Toolbar>
    </AppBar>
    )
}

export default withRouter(TopBar) 

var logoStyle = {
  width: 200,
//   marginLeft: 300
}
