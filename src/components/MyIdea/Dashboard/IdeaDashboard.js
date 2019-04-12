import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import { Card } from 'material-ui'
import './IdeaDashboard.css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

export default function IdeaDashboard(props) {
  
  const [user, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  console.log('User object', user)
  
  // Currently userIdeas are ALL ideas, because it is a non-specific GET request
  const [userIdeas, setUserIdeas] = useState([]);
  console.log('User Ideas', userIdeas)
  useEffect(() => {
     if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then(res => setUserData(res.body));
    else props.history.replace('/MyIdea/login');
  }, []);
  
  // For testing purposes, this gets ALL ideas
  useEffect(() => {
    request
      .get(`${baseUrl}/ideas`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then(res => setUserIdeas(res.body));
  }, []);
  
  const userLogout = () => {
    localStorage.removeItem('currentUserJwt');
    setUserLoggedIn(false);
  };

   const handleClick = () => {
     props.history.replace('/MyIdea/')
   }
  
  if (userLoggedIn === false)
    return (
      <Redirect to='/myIdea' />);
  
  
  //  Condition below should be userIdeas.length > 0, userData.firstName is purely for testing purposes
  // if (userData.firstName) {
    // console.log(userData)
    // console.log(userIdeas.idea[0].idea[3].answers[1])
    console.log(userIdeas)// console.log(sampleData);
    var listOne = userIdeas.map(idea => idea.idea.map(idea => idea))
    console.log(listOne)
    var listTwo = listOne.map(idea => idea[0])
    console.log(listTwo)
    var listThree = listTwo.map(list => list.answers)
    console.log(listThree)
    


    return (
      <div className='dashboard-container'>
        <Container>
          <Content>
            <Heading>

            </Heading>
          </Content>
        </Container>
        <br/>
        <br/>
        <br/>
        <div className='title'>
          <h1>{user.firstName}'s Dashboard</h1>
        </div>
        <div className='flex-tilescontainer'>
          {userIdeas.map(idea => 
            <Link className='tile-link' to={`/dashboard/ideas/${idea.id}`}><div className='idea-tile' key={idea.id}>
          <p>{idea.idea[3].answers[0].qAnswer}</p>    
        </div></Link>
          )}
      </div>
        <div className='statusbar-container'>this will contain the statusbar</div>
          <div className='summary-container'>
          <p>Summary of your idea:</p><br/>
        </div> 
      </div>
    );
  // } else {
  //   return (
  //     <div>
  //     </div>
  //   );
    
  // }
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
  ]


  const PStartContent = posed.div({
    notDisplayingLogin: {
      y: 0,
      opacity: 1.0,
    },
    displayingLogin: {
      y: -390,
      opacity: 0.15,
    },
  });
  
  const StartContent = styled(PStartContent)`
    width: 100%;
  `;
  
  const Logo = styled.img`
    height: 70px;
    align-self: flex-start;
    margin-right: 60px;
  `;
  
  const Controls = styled.div`
    justify-content: space-between;
    display: flex;
    flex-direction: row;
  `;
  
  const Content = styled.div`
    align-self: center;
    justify-self: center;
    color: #ffffff;
    width: 80vw;
    max-width: 900px;
    height: auto;
    max-height: 500px;
    padding: 20px;
    display: grid;
    
    @media only screen and (orientation:portrait) { 
      grid-template-columns: 1fr;
      grid-template-rows:  auto auto;
      grid-template-areas: "logo-area" "content-area";
    }
    @media only screen and (orientation:landscape) { 
      grid-template-columns: auto auto;
      grid-template-rows: auto;
      grid-template-areas: "logo-area content-area";
    }
  `;
  
  const Heading = styled.div`
    font-size: 30px;
    font-weight: 800;
    margin: 18px 10px 80px 10px;
  `;
  
  const Paragraph = styled.div`
    display: block;
    position: relative;
    font-size: 14px;
    font-weight: 400;
    margin: 0 10px 30px;
  `;
  
  const Container = styled.div`
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
    display: flex;
  `;
  