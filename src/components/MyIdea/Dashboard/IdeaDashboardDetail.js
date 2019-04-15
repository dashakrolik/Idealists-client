import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import { Card } from 'material-ui'
import './IdeaDashboard.css'
import IdeaDashboard from './IdeaDashboard'
import { render } from 'react-dom';
import { string, object } from 'prop-types';
import { isObject } from 'util';


export default function IdeaDashboardDetail(props) {

    const [user, setUserData] = useState({});
    const [userLoggedIn, setUserLoggedIn] = useState(true);
    const [userIdeas, setUserIdeas] = useState([]);
    const ideasId = props.match.params.id

    useEffect(() => {
         request
            .get(`${baseUrl}/ideas/${ideasId}`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .then(async (res) => await setUserIdeas(res.body.idea))
    }, []);

    // const ideaDetail = props.authState.user.ideas.map(idea =>
    //     idea.id === props.match.params.id ? idea.map(idea => idea.groupName) : null)

    let qAnswers = []
    const qTitles = []
    const questionTwo = []
    const questionThree = []
    userIdeas.map(idea => {
        idea.answers.map(question => {
            qTitles.push(question.qTitle)
        })
    })

    userIdeas.map(idea => {
        idea.answers.map(answer => {
            if (false) {
                return questionThree.push(answer.qAnswer)

            } else {
                return qAnswers.push(answer.qAnswer)
            }
        })
    })

    console.log(JSON.stringify(qAnswers))

    qAnswers = qAnswers.map(answer => {
        if(typeof answer === 'object'){
            if(answer[0]){
                return answer[0].value
            } else {
                return answer.value
            }
        }
        return answer;
    })

    console.log(qAnswers)
// console.log(userIdeas[2], "HEYYYYTTDGFGSDFSD")

   // console.log(questionThree, 'Answer three')
    // console.log(qAnswers, "AAAAAAA")
    // console.log(answ, "ANSW")
    // console.log(answ[2], 'Answer two array')

    // const answers = answ.map(answer => answer.map(ans => qAnswers.push(ans.qAnswer))) // answers is now an object
    // console.log(qAnswers, "TITLE")
    // const questions = answ.map(question => question.map(q => qTitles.push(q.qTitle)))
    // // const answerTwo = answ.map(answer => answer.map(q => qTitles.push(q[2].qTitle)))
    // // const answerTwo = answ[2].map(q => question2.push(q.qTitle))

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