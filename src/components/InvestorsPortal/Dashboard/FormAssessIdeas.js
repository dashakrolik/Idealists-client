import React, { useEffect, useState } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import './InvestorDashboard.css'
import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import './InvestorDashboard.css'
import Button from '../../reogranisation/Questions/Button';
import Card from '@material-ui/core/Card'

export default function FormAssessIdeas (props) {
    const [userLoggedIn, setUserLoggedIn] = useState(true);
    // if (props.authState.loggedIn === false)
    //     return (
    //     <Redirect to='/InvestorStart' />);

    const [formData, setFormData] = useState({});


    const onSubmit = (data) => {
        const { content } = data
        props.sendAssessment()
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
      
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
          });
        };

    
    const printValues = e => {
        e.preventDefault();
        console.log("PrintValues!");
    };
    
    return (
        <div className='dashboard-container'>
        <br></br><br></br><br></br><br></br>
        <Content>
            <StyledCard>
                <h4>Idea Question</h4>
                <p>Answer</p>
            </StyledCard>
            <StyledCard>
                <h4>Idea Question</h4>
                <p>Answer</p>
            </StyledCard>
            <StyledCard>
                <h4>Idea Question</h4>
                <p>Answer</p>
            </StyledCard>
            <StyledCard>
                <h4>Idea Question</h4>
                <p>Answer</p>
            </StyledCard>
        </Content>
        <Content>
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
            </Content>
            <Button text={'Submit'} onClick={onSubmit} type="submit" />
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
const Content = styled.div`
    align-self: center;
    justify-self: center;
    color: #ffffff;
    width: 90vw;
    max-width: 800px;
    height: auto;
    padding: 20px;
    
`;

const StyledCard = styled(Card) `
    background-color: rgb(255,255,255, 0.3);
    padding-left: 8px;
    padding-right: 8px;
`;