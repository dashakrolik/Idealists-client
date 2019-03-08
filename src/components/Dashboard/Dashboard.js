import React, { useEffect, useState } from 'react'
import request from 'superagent';
import { baseUrl } from '../../constants'

export default function Dashboard(props) {
    const jwt = localStorage.currentUserJwt
    const [userData, setUserData] = useState({})
    const [userIdeas, setUserIdeas] = useState([])


    useEffect(() => {
        request
            .get(`${baseUrl}/current`)
            .set("Authorization", `Bearer ${jwt}`)
            .then(res => setUserData(res.body))
    }, [])


    // This should get ideas by industry
    // useEffect(() => {
    //     request
    //         .get(`${baseUrl}/ideas/:industry`)

    // }, [userData])

    console.log(userData)
    return (

        <div>
            <h4>This is {userData.firstName}'s dashboard</h4>
            <h3>Log out</h3>
            <h3>Edit my profile</h3>
            <h1>Dashboard</h1>
            <ul>
                <li>Sample</li>
                <li>Data</li>
                <li>With</li>
                <li>Idea</li>
                <li>Links</li>
            </ul>
        </div>
    )

}