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

const TopBar = (props) => {

const [history, location] = useState({});

const [authState] = useState({})


return (
    <AppBar>
        <Toolbar className="topBar">
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
            <Button color="inherit" onClick={() => props.history.push('/MyIdea/login')}>Logout</Button> : null
            }
            <img src={logo} alt='Logo' style={logoStyle}/>
        </Toolbar>
    </AppBar>
    )
}

export default withRouter(TopBar)

var logoStyle = {
  width: 200
}