import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import './InvestorDashboard.css'
import styled from '@emotion/styled';
import Card from '@material-ui/core/Card'

export default function MyMentorships(props) {
  
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
  
  if (userLoggedIn === false)
    return (
      <Redirect to='/login' />);
    
    return (
      <div className='dashboard-container'>
        <br />
        <br />
        <h4 className='title'>This is {userData.firstName}'s dashboard</h4>
        <StyledCard>
          My MentorshipsDid you apply for mentorship whilst assessing one of the ideas and want to see if theteam picked you as one of 3 mentors? 
          Do it right here. Mentors receive a 1% equity-interest in the idea-company in exchange for 
          being available to the founder-team at least 1 hour per week.
        </StyledCard>
      </div>
      )
    }


    const StyledCard = styled(Card) `
    background-color: rgb(255,255,255, 0.3);
    padding: 50px;
    width: 500px;
    margin-left: 70px;
    color: white
  `;