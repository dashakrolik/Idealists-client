import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import './InvestorDashboard.css'
import styled from '@emotion/styled';
import Button from '../../reogranisation/Questions/Button';
import posed from 'react-pose';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'

export default function AssessIdeas(props) {
  
  const [userData, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  
  const [expertIdeas, setExpertIdeas] = useState([]);
  
  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then(res => setUserData(res.body))
    else props.history.push('/InvestorStart');
  }, []);
  
  useEffect(() => {
    request
      .get(`${baseUrl}/ideas`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then(res => setExpertIdeas(res.body));
      
  }, []);
  
  const userLogout = () => {
    localStorage.removeItem('currentUserJwt');
    setUserLoggedIn(false);
  };
  
  if (userLoggedIn === false)
    return (
      <Redirect to='/login' />);
    
    return (
      <div className='dashboard-container'>
        <br />
        <br />
        <h2 className='title'>This is {userData.firstName}'s dashboard</h2>
          <StyledCard>
            Here you can track how all of your investments are performing and 
            ask the founders questions or help them with your feedback.
          </StyledCard>
      </div>
    )}


    const StyledCard = styled(Card) `
    background-color: rgb(255,255,255, 0.3);
    padding: 50px;
    width: 500px;
    margin: auto;
    color: white;
    display: flex;
  `;