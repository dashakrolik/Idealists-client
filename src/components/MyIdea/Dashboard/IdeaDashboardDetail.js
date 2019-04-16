import React, { useEffect, useState } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import './IdeaDashboard.css'


export default function IdeaDashboardDetail(props) {
    const [userIdeas, setUserIdeas] = useState([]);
    
    // progress bar
    const [percentRange, setProgress] = useState(0);
    
    const ideasId = props.match.params.id

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
            } else {
                return answer.value
            }
        }
        return answer;
    })

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
            <div className='questions-answers'>
            <h1> Questions and Answers about Idea</h1>
            <p>{qTitles[0]}:</p>
            <p>{qAnswers[0]}</p>
            <br />
            <p>{qTitles[1]}:</p>
            <p>{qAnswers[1]}</p>
            <br />
            <p>{qTitles[2]}:</p>
            <p>{qAnswers[2]}</p>
            <br />
            <p>{qTitles[3]}:</p>
            <p>{qAnswers[3]}</p>
            <br />
            <p>{qTitles[4]}:</p>
            <p>{qAnswers[4]}</p>
            <br />
            <p>{qTitles[5]}:</p>
            <p>{qAnswers[5]}</p>
            <br />
            <p>{qTitles[6]}:</p>
            <p>{qAnswers[6]}</p>
            <br />
            <p>{qTitles[7]}:</p>
            <p>{qAnswers[7]}</p>
            <br />
            <p>{qTitles[8]}:</p>
            <p>{qAnswers[8]}</p>
            <br />
            <p>{qTitles[9]}:</p>
            <p>{qAnswers[9]}</p>
            <br />
            <p>{qTitles[10]}:</p>
            <p>{qAnswers[10]}</p>
            <br />
            <p>{qTitles[11]}:</p>
            <p>{qAnswers[11]}</p>
            <br />
            </div>


        </div>)

}