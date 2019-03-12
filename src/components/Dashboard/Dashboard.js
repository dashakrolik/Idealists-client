import React, { useEffect, useState, useContext } from 'react'
import request from 'superagent';
import { baseUrl } from '../../constants'
import { Redirect, Link } from 'react-router-dom'
import { LoginContext } from '../Login/LoginContext';

export default function Dashboard(props) {

    const { jwt } = useContext(LoginContext)
    const localJwt = localStorage.currentUserJwt
    const [userData, setUserData] = useState({})
    const [userIdeas, setUserIdeas] = useState([])
    const [userLoggedIn, setUserLoggedIn] = useState(true)

    useEffect(() => {
        if (jwt || localJwt)
            request
                .get(`${baseUrl}/current`)
                .set("Authorization", `Bearer ${jwt || localJwt}`)
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
    if (userData.firstName)
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
    if (!userData.firstName) return (
        <div>Fetching user data...
        <h3> If you keep seeing this, you probably are not <Link to="/login">logged in</Link> yet.</h3 >
        
        </div>
    )

}