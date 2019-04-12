import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import './IdeaDashboard.css'



export default function IdeaDashboardDetail(props) {

    const [user, setUserData] = useState({});
    const [userLoggedIn, setUserLoggedIn] = useState(true);
    const [userIdeas, setUserIdeas] = useState([]);
    const ideasId = props.match.params.id
    const [automatchResults, DoAutomatch] = useState([])

    useEffect(() => {
        request
            .get(`${baseUrl}/ideas/${ideasId}`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .then(idea => setUserIdeas(idea.body))
    }, []);

    useEffect(() => {
        request
            .get(`${baseUrl}/automatch/965`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .then(automatch => DoAutomatch(automatch.body))
    }, []);

    console.log(ideasId)
    console.log(automatchResults)
    return (
    
        <div>
            
        </div>

    )
}
