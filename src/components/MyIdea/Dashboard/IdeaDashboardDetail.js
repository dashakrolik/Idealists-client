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
                        <li class="step-progress-item current"><strong>First patent check (1 week)</strong></li>
                        <li class="step-progress-item"><strong>Expert check (2 weeks)</strong></li>
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
                { qTitles.map((title, index) => 
                    <div className='questions-answers'>
                        <StyledCard key={index} className='card-detail'>
                            <h4>{title}:</h4>
                            <p>{qAnswers[index]}</p>
                        </StyledCard>
                    </div>
                )}
            </main>
        </Grid>
    )

}


const StyledCard = styled(Card) `
    background-color: rgb(255,255,255, 0.3);`

    
