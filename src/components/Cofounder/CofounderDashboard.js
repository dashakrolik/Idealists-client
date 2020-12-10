import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import { Redirect, Link } from "react-router-dom";
import "../MyIdea/Dashboard/IdeaDashboard.css";
import ideaImg from "../../res/assess-white.png"
import styled from '@emotion/styled'

import Rating from "./Rating"



export default function CofounderDashboard(props) {
  const [user, setUserData] = useState({});

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => setUserData(res.body));
    else props.history.replace("/Cofounder/login");
  }, []);

  if (props.authState.loggedIn === false) return <h1>Not logged in</h1>;
  if (props.authState.user.isApproved === null) return (

    <div className="dashboard-container">
      <br />
      <br />
      <br />
      <h3>Your Application is being reviewed, we'll get back to you shortly!</h3>
    </div>
  )

  if (props.authState.user.isApproved === false) return (

    <div className="dashboard-container">
      <br />
      <br />
      <br />
      <h3>Your Application has been rejected, you wont be able to view and bid on ideas</h3>;
    </div>
  )

  return (
    <div className="dashboard-container">
      <br />
      <br />
      <div>
        <h1>{user.firstName}'s Dashboard</h1>
      </div>
      <div className='items-wrapper'>
        <div className="flex-ideacontainer">
          <Link className="links" to="/Cofounder/dashboard/ideas">
            <div className="assess-tiles">
              <img alt="icon" className="icons" src={ideaImg}></img>
              <h4>List of ideas</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

const LeftSide = styled.div`
  position: absolute;
  color: #ffffff;
  top: 50%;
  left: 50%;
  width: 360px;
  height: 300px;
  margin-left: -360px;
  margin-top: -150px;
  padding-top: 10px;

  h3 {
    display: block;
    position: relative;
    left: 47px;
    width: 80%;
    font-size: 24px;
    font-weight: 500;
    padding: 5px;
    margin: 50px 5px 5px;
  }

  p {
    display: block;
    position: relative;
    left: 47px;
    top: 10px;
    width: 80%;
    font-size: 10px;
    font-weight: 300;
    padding: 5px;
    margin: 5px;
  }

  a {
    font-weight: 800;

    &:hover {
      cursor: pointer;
      color: #dfeff2;
    }
  }
`


