import React, { useEffect, useState, Component } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import './IdeaDashBoardDetail.css'
import styled from '@emotion/styled';
import Card from '@material-ui/core/Card'
import { Redirect, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import Button from '../../reogranisation/Questions/Button';


export default function IdeaDashboardDetail(props) {
    const [userIdeas, setUserIdeas] = useState([]);
    
    // progress bar
    const [percentRange, setProgress] = useState(0);
    
    const ideasId = props.match.params.id
    if (props.authState.LoggedIn === false) {
    return (
      <Redirect to='/myIdea' />
    ) }
    useEffect(() => {
        request
            .get(`${baseUrl}/ideas/${ideasId}`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .then(res => setUserIdeas(res.body.idea))
    }, []);

    const processTitle = (title) => {
        let splitTitle = title.split('?')
        const processedTitle = splitTitle[0] 
        return processedTitle
    }

    let qAnswers = []
    const qTitles = []
    userIdeas.map(idea => {
        idea.answers.map(question => {
            if (question.qTitle.length > 50) {
            const title = processTitle(question.qTitle) 
            qTitles.push(title)
        } else {
            qTitles.push(question.qTitle)
            }
        })
    })

    userIdeas.map(idea => {
        idea.answers.map(answer => {
            qAnswers.push(answer.qAnswer)
        })
    })

    

    qAnswers = qAnswers.map(answer => typeof answer === 'object' ? answer[0] ? answer[0].value : answer.value : answer)

    if (qAnswers[0] === 'true') {
        qAnswers[0] = 'yes'
    }

    if (props.authState.LoggedIn === false && localStorage.currentUserJwt === null) {
        return (
          <Redirect to='/myIdea' />
        ) }
    return (
        
        <Grid className='dashboard-container'
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
            >   
            <div>
                <br /><br /><br /><br /><br />
                <StyledDiv>
                    <h1>Assessing Your Idea:</h1>
                    <ul className="step-progress">
                        <li className="step-progress-item is-done"><strong>Submit your idea</strong></li>
                        <li className="step-progress-item current"><strong>First patent check (1 week)</strong></li>
                        <li className="step-progress-item"><strong>Expert check (2 weeks)</strong></li>
                        <li className="step-progress-item"><strong>Second patent check (2 weeks)</strong></li>
                        <li className="step-progress-item"><strong>Validation phase (4 weeks)</strong></li>
                        <li className="step-progress-item"><strong>Final patent check (2 weeks)</strong></li>
                        <li className="step-progress-item"><strong>Business plan phase (2 weeks)</strong></li>
                        <li className="step-progress-item"><strong>Funding phase (2 weeks)</strong></li>
                        <li className="step-progress-item"><strong>Company is born (1 week)</strong></li>
                    </ul>
                    
                </StyledDiv>
                <div>
                <Button color="inherit" text="Patent Check" onClick={() => props.history.push('/automatch')}/>
                </div>
            </div>
            <main>
                <br /><br /><br /><br /><br /><br />
                <h1 className='header' > Questions and Answers about Idea</h1>
                { qTitles.map((title, index) => 
                    <div key={index} className='questions-answers'>
                        <StyledCard className='card-detail'>
                            <h4>{title}:</h4>
                            <p>{qAnswers[index]}</p>
                        </StyledCard>
                    </div>
                )}
                
            </main>
        </Grid>
    )

}

const StyledDiv = styled.div `
    margin: 0 auto;
    width: 330px;
    font-family: 'Helvetica';
    font-size: 14px;
    border: 1px solid #ccc;
    padding: 20px;
    color: white;
    margin-bottom: 20px
`
const StyledCard = styled(Card) `
    background-color: rgb(255,255,255, 0.3);
    padding: 10px
    `


    

