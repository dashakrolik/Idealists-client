import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { useEffect, useState } from 'react';
import './TopBar.css'
import {withRouter} from 'react-router-dom'

const TopBar = (props) => {

const [history, location] = useState({});
console.log(props.location.pathname);
const [authState] = useState({})
console.log(props, 'TopBar props')

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
        </Toolbar>
    </AppBar>
    )
}

export default withRouter(TopBar)