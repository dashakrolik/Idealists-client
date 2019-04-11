import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import { Card } from 'material-ui'
import './IdeaDashboard.css'
import IdeaDashboard from './IdeaDashboard'


export default function IdeaDashboardDetail(props) {

    const [user, setUserData] = useState({});
    const [userLoggedIn, setUserLoggedIn] = useState(true);
    const [userIdeas, setUserIdeas] = useState([]);
    const ideasId = props.match.params.id

    useEffect(() => {
        request
            .get(`${baseUrl}/ideas/${ideasId}`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .then(idea => setUserIdeas(idea.body)/* console.log('res.body', res.body*/)
    }, []);
    // console.log(props.authState.user.ideas)
    // const ideaDetail = props.authState.user.ideas.map(idea =>
    //     idea.id === props.match.params.id ? idea.map(idea => idea.answers) : null)
    // console.log(ideaDetail)

    // var list = userIdeas.idea //this contains the array of answers
    
    console.log(userIdeas, "Useridea")
    

    return (<div>
        {userIdeas.idea.map(idea => ( 
                <li>
                {idea.groupName},
                <br/>
                {idea.answers.map(answer => (
                    <li>{answer.answer}</li>
                ))}
                 </li>
        ))}
        "HEYYY" }
    </div>

    )
}

// {props.allEvents.map(event => (
//     <Link to={`/events/${event.id}`} key={event.id}>
//       <li>
//         <img src={event.image} alt=''/>
//         <br />
//         <p >{event.name}</p>
//         <br />
//         <p>{event.description}</p>
//         <br />
//         <p>{event.startDate}</p>
//         <br />
//         <p>{event.endDate}</p>
//         <hr />          
//         <div/>
//       </li>
//     </Link>