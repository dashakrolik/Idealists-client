import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import './AssessIdeas.css'
import styled from '@emotion/styled';
import Button from '../../reogranisation/Questions/Button';
import posed from 'react-pose';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'


export default function AssessIdeas(props) {

  const [userData, setUserData] = useState({});
  // const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [expertIdeas, setExpertIdeas] = useState([]);

  const [assessments, getAssessments] = useState([])
  



  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then(res => setUserData(res.body))
    else props.history.push('/InvestorStart');
  }, []);

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/ideas`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then(res => setExpertIdeas(res.body));
  }, []);


  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/assessments`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then(res => getAssessments(res.body))
    else props.history.push('/InvestorStart');
  }, []);
  
  console.log(assessments)
  
  const userLogout = () => {
    localStorage.removeItem('currentUserJwt');
    setUserLoggedIn(false);
  };


  // const userLogout = () => {
  //   localStorage.removeItem('currentUserJwt');
  //   setUserLoggedIn(false);
  // };

  console.log(expertIdeas, "experttt")
// console.table(userData.industry, "INDDSSSS")
  if (props.authState.LoggedIn === false)
    return (
      <Redirect to='/login' />);


      <div className='dashboard-container'>
        <br />
        <br />

  if (!props.authState.user) {
    props.user()
  }


  return (

    <div className='assessIdeas-container'>
      <br />
      <br />
      <div className='title'>
        <h1 >This is {userData.firstName}'s Expert dashboard</h1>
      </div>
      {/* <StyledCard>
        Here you get to assess ideas in a very simple and fast way and get rewarded for it at the same time.
        When an idea you helped assess becomes incorporated, you’ll receive € 100,- worth of equity in that company.
        Assessing an idea takes on average 3 minutes.
        </StyledCard>
      <StyledCard>
        <Link to='/investors/dashboard/assess/:id'>Sample Idea 2</Link>
      </StyledCard> */}
      {expertIdeas.length < 1 ? <h2 style={styledH2}><a href="/MyIdea/new">Sorry There is no idea related with your industry selection!</a></h2> : <h2 style={styledH2}>Please check the ideas related with your industries</h2>}
      <div className='flex-tilescontainer'>
        {expertIdeas.map(idea =>
          <Link key={idea.id} className='tile-link' to={`/investors/dashboard/assess/${idea.id}`}>
            <div className='assess-tile' key={idea.id}>
              <p style={{ color: "black" }}><b>Title: </b><br />{idea.idea[3].answers[0].qAnswer}</p>
              <br />
              <p style={{ color: "black" }}><b>Description: </b><br />{idea.idea[3].answers[1].qAnswer}</p>
              <br />
              <p style={{ color: "black" }}><b>Industries: </b>{idea.idea[2].answers[1].qAnswer.map(industries => <li>{industries.value}</li>)}</p>

              {/* {idea.progress.step01 === true &&
                  idea.progress.step02 === true &&
                  idea.progress.step03 === false && <p>Status: First patent check </p>}
                {idea.progress.step01 === true &&
                  idea.progress.step02 === true &&
                  idea.progress.step03 === true &&
                  idea.progress.step04 === false && <p>Status: Expert check </p>} */}
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

const styledH2 = {
  fontSize: 20,
  fontWeight: 800,
  color: 'white',
}

// const StyledCard = styled(Card)`
//       background-color: rgb(255,255,255, 0.3);
//       padding: 50px;
//       width: 500px;
//       margin-left: 70px;
//       color: black
//   `;