import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import './IdeaDashboard.css'
import posed from 'react-pose';

export default function IdeaDashboard(props) {

  const [user, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  const [userIdeas, setUserIdeas] = useState([]);

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then(res => setUserData(res.body));
    else props.history.replace('/MyIdea/login');
  }, []);

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then(res => setUserIdeas(res.body));
  }, []);

  const handleClick = () => {
    props.history.replace('/MyIdea/')
  }

  if (props.authState.LoggedIn === false)
    return (
      <Redirect to='/myIdea' />)


  if (!props.authState.user) {
    props.user()
  }

  return (
      <div className='dashboard-container'>
        <br/>
        <br/>
        <br/>
        <div className='title'>
          <h1>{user.firstName}'s Dashboard</h1>
        </div>
        {userIdeas.length < 1 ? <h2 style={styledH2}><a href="/MyIdea/new">Submit your first idea</a></h2> : <h2 style={styledH2}>Please follow your next step: your market check</h2>}
        <div className='flex-tilescontainer'>
            {userIdeas.map(idea => 
              <Link key={idea.id} className='tile-link' to={`/dashboard/ideas/${idea.id}`}>
                <div className='idea-tile' key={idea.id}>
                  <p>{idea.idea[3].answers[0].qAnswer}</p>
                  <br />
                  <p>{idea.idea[3].answers[1].qAnswer }</p>
                  { idea.progress === null || 
                    idea.progress.step01 === true && 
                    idea.progress.step02 === true && 
                    idea.progress.step03 === false && <p>Status: First patent check </p>}
                  { idea.progress === null || 
                    idea.progress.step01 === true &&
                    idea.progress.step02 === true &&
                    idea.progress.step03 === true && 
                    idea.progress.step04 === false && <p>Status: Expert check </p>}
                </div>
              </Link>
              )}
      </div>
    </div>
  );
}

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


const styledH2 = {
  fontSize: 20,
  fontWeight: 800,
  color: 'white',
}
