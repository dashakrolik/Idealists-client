import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import { Card } from 'material-ui'
import './IdeaDashboard.css'
import IdeaDashboard from './IdeaDashboard'
import { render } from 'react-dom';


export default function IdeaDashboardDetail(props) {

    const [user, setUserData] = useState({});
    const [userLoggedIn, setUserLoggedIn] = useState(true);
    const [userIdeas, setUserIdeas] = useState([]);
    const ideasId = props.match.params.id

    useEffect(() => {
        request
            .get(`${baseUrl}/ideas/${ideasId}`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .then(res => setUserIdeas(res.body.idea))
    }, []);

    // const ideaDetail = props.authState.user.ideas.map(idea =>
    //     idea.id === props.match.params.id ? idea.map(idea => idea.groupName) : null)

    const qAnswers = []
    const qTitles = []
    const question2 = []
    console.log(userIdeas, "USERRRR")
    const answ = userIdeas.map(idea => idea.answers) //ans is now an array
    console.log(answ, "ANSW")
    console.log(answ[2], 'Answer two array')

    const answers = answ.map(answer => answer.map(ans => qAnswers.push(ans.qAnswer))) // answers is now an object
    console.log(qAnswers, "TITLE")
    const questions = answ.map(question => question.map(q => qTitles.push(q.qTitle)))
    // const answerTwo = answ.map(answer => answer.map(q => qTitles.push(q[2].qTitle)))
    // const answerTwo = answ[2].map(q => question2.push(q.qTitle))
    console.log(answ[2[0]], 'Answer two, first element of array')
    // console.log(question2, 'AnswerTwo')
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
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


        </div>)

}