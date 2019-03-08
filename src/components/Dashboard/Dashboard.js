import React, { useEffect, useState } from 'react'
import request from 'superagent';
import { baseUrl } from '../../constants'
import { Redirect } from 'react-router-dom'

export default function Dashboard(props) {
    const jwt = localStorage.currentUserJwt
    const [userData, setUserData] = useState({})
    const [userIdeas, setUserIdeas] = useState([])
    const [userLoggedIn, setUserLoggedIn] = useState(true)



    // look into useContext instead
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

    const userLogout = () => {
        localStorage.removeItem('currentUserJwt')
        setUserLoggedIn(false)
    }

    if (userLoggedIn === false)
        return (
            <Redirect to="/login" />)

    return (
        <div>

            <h4>This is {userData.firstName}'s dashboard</h4>
            <button onClick={userLogout}>Log out</button>
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