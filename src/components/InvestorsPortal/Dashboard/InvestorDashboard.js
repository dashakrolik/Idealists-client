import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';

export default function InvestorDashboard(props) {
  
  const [userData, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  
  // Currently userIdeas are ALL ideas, because it is a non-specific GET request
  const [userIdeas, setUserIdeas] = useState([]);
  
  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then(res => setUserData(res.body))
    else props.history.push('/Investors/login');
  }, []);
  
  // For testing purposes, this gets ALL ideas
  useEffect(() => {
    request
      .get(`${baseUrl}/ideas`)
      .then(res => setUserIdeas(res.body));
  }, []);
  
  const userLogout = () => {
    localStorage.removeItem('currentUserJwt');
    setUserLoggedIn(false);
  };
  
  if (userLoggedIn === false)
    return (
      <Redirect to='/login' />);
  
  
  // Condition below should be userIdeas.length > 0, userData.firstName is purely for testing purposes
  if (userData.firstName) {
    // console.log(userData)
    // console.log(userIdeas)

    
    return (
      <div>
        
        <h4>This is {userData.firstName}'s dashboard</h4>
        <h3>Edit my profile</h3>
        <h1>Dashboard</h1>
        <ul>
          <li>Sample</li>
          <li>Data</li>
        </ul>
        <ul>
          {sampleData.map(idea => {
            return <li key={idea.id}><Link to={`/dashboard/ideas/${idea.id}`}>
              {idea.createdAt}</Link>
            </li>;
          })}
        </ul>
      
      </div>
    );
  } else {
    return (
      <div>
      </div>
    );
    
  }
}

// Code below is just sample data because the ideas database is empty
const sampleData =
  [
    {
      "createdAt": "2019-03-12T13:57:40.889Z",
      "id": 1,
      "idea": "{\"question1\":\"answer1\",\"question2\":\"answer2\",\"question3\":\"answer3\"}",
    },
    {
      "createdAt": "2019-03-12T13:57:54.639Z",
      "id": 2,
      "idea": "{\"question1\":\"answer1\",\"question2\":\"answer2\",\"question3\":\"answer3\"}",
    },
    {
      "createdAt": "2019-03-12T13:58:14.973Z",
      "id": 3,
      "idea": "{\"question1\":\"answer1\",\"question2\":\"answer2\",\"question3\":\"answer3\"}",
    },
  ];