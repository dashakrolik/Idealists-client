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

return (
    <AppBar>
        <Toolbar className="topBar">
            {
            <Button color="inherit" onClick={() => props.history.push('/MyIdea/login')}>Login</Button>
            }
            {
            <Button color="inherit" onClick={() => props.history.push('/MyIdea')}>Sign Up</Button>
            }
            {
            <Button color="inherit" onClick={() => props.history.push('/Dashboard')}>Dashboard</Button>
            }
            {
            <Button color="inherit" onClick={() => props.history.push('/MyIdea/new')}>New Idea</Button>
            }
        </Toolbar>
    </AppBar>
    )
}

export default withRouter(TopBar)