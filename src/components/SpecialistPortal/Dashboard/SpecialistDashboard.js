import React, { useEffect, useState, useContext } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import { Redirect, Link } from "react-router-dom";
import "./SpecialistDashboard.css";
import mentor from "../../../res/mentor.png";
// import assess from '../../../res/assess-white.png'
// import invest from '../../../res/invest-white.png'

// import crowdfunding from '../../../res/crowdfunding.png'

export default function specialistDashboard(props) {
  const [userData, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => setUserData(res.body));
    else props.history.push("/SpecialistStart");
  }, []);

  if (props.authState.loggedIn && !props.authState.user) {
    props.user();
  }

  if (userLoggedIn === false) return <Redirect to="/Specialist/login" />;

  const showNewSpecialist =
    props.authState.user.role === "admin" ? (
      <Link className="links" to="/Admin/dashboard/newspecialist">
        <div className="invest-tile">
          <img className="icons" src={mentor}></img>
          <h4>Add Specialist</h4>
        </div>
      </Link>
    ) : null;

  return (
    <div className="dashboard-container">
      <h2 className="title">{userData.firstName}'s specialist dashboard</h2>
      <div className="flex-tilescontainer">{showNewSpecialist}</div>
    </div>
  );
}
