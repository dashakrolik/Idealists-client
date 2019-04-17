import React, { useEffect, useState } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import './IdeaDashBoardDetail.css'
import Card from '@material-ui/core/Card'
import { Redirect, Link } from 'react-router-dom';
export default function IdeaDashboardDetail(props) {
    const [userIdeas, setUserIdeas] = useState([]);
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

    qAnswers = qAnswers.map(answer => {
        if (typeof answer === 'object') {
            if (answer[0]) {
                return answer[0].value
            }
            else {
                return answer.value
            }
        }
        return answer;
    })

    if (qAnswers[0] === 'true') {
        qAnswers[0] = 'yes'
    }

    if (props.authState.LoggedIn === false && localStorage.currentUserJwt === null) {
        return (
          <Redirect to='/myIdea' />
        ) }
    return (
        <div className='dashboard-container'>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='statusbar-container'>
                Assessing Your Idea:
          <ul className="progressbar">

                    <li className="active">Idea Comes In</li>
                    <li>Automated Novelty and Patent/IP Check</li>
                    <li>Collective Intelligence Sift Filter</li>
                    <li>Expert Novelty and Patent/IP Check</li>
                    <li>Validation Process</li>
                    <li>Expert Novelty and Patent/IP Check</li>
                    <li>Determine Finance Need and Timeframe</li>

                </ul>
            </div>
            <br />
            <br />
            <h1 className='header'> Questions and Answers about Idea</h1>
            <br />
            <div className='questions-answers'>
                <Card className='card-detail'>
                    <h4>{qTitles[0]}:</h4>
                    <p>{qAnswers[0]}</p>
                </Card>
                <Card className='card-detail'>
                    <h4>{qTitles[1]}:</h4>
                    <p>{qAnswers[1]}</p>
                </Card>
                <Card className='card-detail'>
                    <h4>{qTitles[2]}:</h4>
                    <p>{qAnswers[2]}</p>
                </Card>
                <Card className='card-detail'>
                    <h4>{qTitles[3]}:</h4>
                    <p>{qAnswers[3]}</p>
                </Card>

                <Card className='card-detail'>
                    <h4>{qTitles[4]}:</h4>
                    <p>{qAnswers[4]}</p>
                </Card>

                <Card className='card-detail'>
                    <h4>{qTitles[5]}:</h4>
                    <p>{qAnswers[5]}</p>
                </Card>

                <Card className='card-detail'>
                    <h4>{qTitles[6]}:</h4>
                    <p>{qAnswers[6]}</p>
                </Card>

                <Card className='card-detail'>
                    <h4>{qTitles[7]}:</h4>
                    <p>{qAnswers[7]}</p>
                </Card>

                <Card className='card-detail'>
                    <h4>{qTitles[8]}:</h4>
                    <p>{qAnswers[8]}</p>
                </Card>

                <Card className='card-detail'>
                    <h4>{qTitles[9]}:</h4>
                    <p>{qAnswers[9]}</p>
                </Card>

                <Card className='card-detail'>
                    <h4>{qTitles[10]}:</h4>
                    <p>{qAnswers[10]}</p>
                </Card>

                <Card className='card-detail'>
                    <h4>{qTitles[11]}:</h4>
                    <p>{qAnswers[11]}</p>
                </Card>
                <br />
                <br />
                <br />
                <br />
                <br />

            </div>


        </div>)

}