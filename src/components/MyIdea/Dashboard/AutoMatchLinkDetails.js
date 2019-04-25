import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { Redirect, Link } from 'react-router-dom';
import { baseUrl } from '../../../constants';
import './IdeaDashboard.css'
/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';



export default function AutoMatchLinkDetails(props) {
  const [user, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [userIdeas, setUserIdeas] = useState([]);
  const ideasId = props.match.params.id
  const [automatchResults, DoAutomatch] = useState([])
  const [currentValue, setCurrentValue] = useState([])

  const automatchId = props.match.params.patentNumber

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideasId}/automatch/${automatchId}`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then(automatch => DoAutomatch(Object.values(automatch.body.autoMatch['automatch-results']['index-1'])))
  }, []);
  
  console.log(automatchResults)
  let automatchTitle = automatchResults.map(result => result.bibliographic.title[0].text)
//   console.log(automatchResults[0])
  // console.log(automatchTitle)
  // console.log(automatchResults)
  let automatchText = automatchResults.map(result => 
    result.passage.text.split('.').slice(1,-1).join() + '.'
  )
  // console.log(automatchText)
  let relevanceScore = automatchResults.map(result => result.relevance.score)
  // console.log(relevanceScore)

  let relevanceNumber = automatchResults.map(b => b.relevance.number)
  if (typeof automatchResults.autoMatch === 'object') {
    // console.table(automatchResults.autoMatch['0'].relevance)
  }

  
 


  const handleChange = (e) => {
      setCurrentValue(e.target.value);
    
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currentValue)

  };

  if (automatchResults) {

    return (
        <div>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            <p>
            I am Link automatch details
            </p>
            </div>
    )}}