import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { useEffect, useState } from 'react';

const TopBar = (props) => {

const [history, location] = useState({});


return (
    <AppBar>
        <Toolbar>
            {
            <Button color="inherit" onClick={() => history.push('/MyIdea/login')}>Login</Button>
            }
            {
            <Button color="inherit" onClick={() => history.push('/MyIdea')}>Sign Up</Button>
            }
            {
            <Button color="inherit" onClick={() => history.push('/Dashboard')}>Dashboard</Button>
            }
            {
            <Button color="inherit" onClick={() => history.push('/MyIdea/new')}>New Idea</Button>
            }
        </Toolbar>
    </AppBar>
    )
}

export default TopBar