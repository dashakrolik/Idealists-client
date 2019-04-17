import React, { useEffect, useState, Component } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import './IdeaDashBoardDetail.css';
import styled from '@emotion/styled';

import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'


export default function IdeaDashboardDetail(props) {
    const [userIdeas, setUserIdeas] = useState([]);
    const ideasId = props.match.params.id

    const { classes } = props;

    useEffect(() => {
        request
            .get(`${baseUrl}/ideas/${ideasId}`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .then(res => setUserIdeas(res.body.idea))
    }, []);

    let qAnswers = []
    const qTitles = []
    userIdeas.map(idea => {
        idea.answers.map(question => {
            qTitles.push(question.qTitle)
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

    return (
        
        <Grid className='dashboard-container'
            container
            spacing="20"
            direction="row-2"
            justify="space-evenly"
            alignItems="flex-start"
            margin-top="-20px"
            >   
            <div>
                <br /><br /><br /><br /><br />
                <div class="wrapper">
                    
                    <h1>Assessing Your Idea:</h1>
                    <ul class="step-progress">
                        <li class="step-progress-item is-done"><strong>Submit your idea</strong></li>
                        <li class="step-progress-item is-done"><strong>First patent check (1 week)</strong></li>
                        <li class="step-progress-item current"><strong>Expert check (2 weeks)</strong></li>
                        <li class="step-progress-item"><strong>Second patent check (2 weeks)</strong></li>
                        <li class="step-progress-item"><strong>Validation phase (4 weeks)</strong></li>
                        <li class="step-progress-item"><strong>Final patent check (2 weeks)</strong></li>
                        <li class="step-progress-item"><strong>Business plan phase (2 weeks)</strong></li>
                        <li class="step-progress-item"><strong>Funding phase (2 weeks)</strong></li>
                        <li class="step-progress-item"><strong>Company is born (1 week)</strong></li>
                    </ul>
                </div>
            </div>
            <main>
                <br /><br /><br /><br /><br /><br />
                <h1 className='header'> Questions and Answers about Idea</h1>
                <div className='questions-answers'>
                    <StyledCard className='card-detail'>
                        <h4>{qTitles[0]}:</h4>
                        <p>{qAnswers[0]}</p>
                    </StyledCard>
                    <StyledCard className='card-detail'>
                        <h4>{qTitles[1]}:</h4>
                        <p>{qAnswers[1]}</p>
                    </StyledCard>
                    <StyledCard className='card-detail'>
                        <h4>{qTitles[2]}:</h4>
                        <p>{qAnswers[2]}</p>
                    </StyledCard>
                    <StyledCard className='card-detail'>
                        <h4>{qTitles[3]}:</h4>
                        <p>{qAnswers[3]}</p>
                    </StyledCard>

                    <StyledCard className='card-detail'>
                        <h4>{qTitles[4]}:</h4>
                        <p>{qAnswers[4]}</p>
                    </StyledCard>

                    <StyledCard className='card-detail'>
                        <h4>{qTitles[5]}:</h4>
                        <p>{qAnswers[5]}</p>
                    </StyledCard>

                    <StyledCard className='card-detail'>
                        <h4>{qTitles[6]}:</h4>
                        <p>{qAnswers[6]}</p>
                    </StyledCard>

                    <StyledCard className='card-detail'>
                        <h4>{qTitles[7]}:</h4>
                        <p>{qAnswers[7]}</p>
                    </StyledCard>

                    <StyledCard className='card-detail'>
                        <h4>{qTitles[8]}:</h4>
                        <p>{qAnswers[8]}</p>
                    </StyledCard>

                    <StyledCard className='card-detail'>
                        <h4>{qTitles[9]}:</h4>
                        <p>{qAnswers[9]}</p>
                    </StyledCard>

                    <StyledCard className='card-detail'>
                        <h4>{qTitles[10]}:</h4>
                        <p>{qAnswers[10]}</p>
                    </StyledCard>

                    <StyledCard className='card-detail'>
                        <h4>{qTitles[11]}:</h4>
                        <p>{qAnswers[11]}</p>
                    </StyledCard>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </main>
        </Grid>
    )

}


const StyledCard = styled(Card) `
    background-color: rgb(255,255,255, 0.3);`

    
