import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import { Redirect, Link } from 'react-router-dom';
import './InvestorDashboard.css'
import assess from '../../../res/assess-white.png'
import invest from '../../../res/invest-white.png'
import mentor from '../../../res/mentor.png'
import crowdfunding from '../../../res/crowdfunding.png'

export default function investorDashboard(props) {
    const [userData, setUserData] = useState({});
    const [userLoggedIn, setUserLoggedIn] = useState(true)

    useEffect(() => {
        if (props.authState.loggedIn)
            request
                .get(`${baseUrl}/current`)
                .set("Authorization", `Bearer ${props.authState.token}`)
                .then(res => setUserData(res.body))
        else props.history.push('/InvestorStart');
    }, []);

    if (props.authState.loggedIn && !props.authState.user) {
        props.user()
    }

    if (userLoggedIn === false)
        return (
            <Redirect to='/Investors/login' />)

    return (
        

        <div className='dashboard-container'>
            <h2 className='title'>{userData.firstName}'s expert dashboard</h2>
            <div className='flex-tilescontainer'>
                <Link className='links' to='/investors/dashboard/assess'>
                    <div className='assess-tiles'>
                        <img className='icons' src={assess}></img>
                        <h4>Assess ideas</h4>
                    </div>
                </Link>

                <Link className='links' to='/investors/dashboard/invest'>
                    <div className='invest-tile'>
                        <img className='icons' src={invest}></img>
                        <h4>My Investments</h4>
                    </div>
                </Link>

                <Link className='links' to='/investors/dashboard/crowdfunding'>
                    <div className='invest-tile'>
                        <img className='icons' src={crowdfunding}></img>
                        <h4>Crowd Funding</h4>
                    </div>
                </Link>

                <Link className='links' to='/investors/dashboard/mymentorships'>
                    <div className='invest-tile'>
                        <img className='icons' src={mentor}></img>
                        <h4>My mentorships</h4>
                    </div>
                </Link>



            </div>
        </div>
    )
}



