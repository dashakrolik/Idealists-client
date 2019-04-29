import React, { useEffect, useState } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import './InvestorDashboard.css'
import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import './InvestorDashboard.css'


export default function FormAssessIdeas (props) {
    const [userLoggedIn, setUserLoggedIn] = useState(true);
    if (props.authState.loggedIn === false)
    return (
      <Redirect to='/InvestorStart' />);
    return (
        <div className='dashboard-container'>
            <AddlQuestions>
                Assess the idea: 
                <StyledTextField
                    id="filled-multiline-flexible"
                    label="Will people want this?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    />
                <StyledTextField
                    id="filled-multiline-flexible"
                    label="Does this solve a problem people currently have?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    />
                <StyledTextField
                    id="filled-multiline-flexible"
                    label="Is it, in your opinion, a good idea?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    />
                <StyledTextField
                    id="filled-multiline-flexible"
                    label="Is it the right timing for this idea?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    />
                <StyledTextField
                    id="filled-multiline-flexible"
                    label="Imagine you’re an advocate for this idea. Name up to 5 reasons why you would be so ‘pro’ this idea:"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    />
                <StyledTextField
                    id="filled-multiline-flexible"
                    label="Imagine you’re an opponent of this idea. Name up to 5 reasons why you would be so ‘against’ this idea:"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    />
                <StyledTextField
                    id="filled-multiline-flexible"
                    label="What do you expect as time to impact for this idea"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    />
                <StyledTextField
                    id="filled-multiline-flexible"
                    label="What do you expect as magnitude of impact for this idea"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    />
                <StyledTextField
                    id="filled-multiline-flexible"
                    label="Why is this not yet out there? Why have people in this field or that could be helped by it, not successfully created it yet?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    />
                <StyledTextField
                    id="filled-multiline-flexible"
                    label="Who would, in your opinion, be the ideal customers for this idea?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    />
            </AddlQuestions>
        </div>
    )
}

const StyledTextField = styled(TextField)`
background-color: rgb(255,255,255, 0.5);
marginLeft: theme.spacing.unit;
marginRight: theme.spacing.unit;

`;

const AddlQuestions = styled.div `
padding: 3em;
border: 1px solid #ccc;
`
