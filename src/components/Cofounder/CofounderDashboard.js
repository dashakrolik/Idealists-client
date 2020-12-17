import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import { Link } from "react-router-dom";
import "../MyIdea/Dashboard/IdeaDashboard.css";
import ideaImg from "../../res/assess-white.png";
import styled from "@emotion/styled";
import Rating from "./Rating";
import assesWhite from "../../res/assess-white.png";
import mentor from "../../res/mentor.png";

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

  if (user.isApproved === null) {
    const {
      who,
      why,
      whyNow,
      UNgoals,
      Pride,
      workExperience,
      eduBackground,
      languages,
      personalityTest,
      video,
    } = props.profile;
    if (
      !who ||
      !why ||
      !whyNow ||
      !UNgoals ||
      !Pride ||
      !workExperience ||
      !eduBackground ||
      !languages ||
      !personalityTest ||
      !video
    ) {
      props.history.replace("/cofounderWelcomePage");
    }

    return (
      <div className="dashboard-container">
        <br />
        <br />
        <br />
        <h3 style={styles.textStyle}>
          Your Application is being reviewed, we'll get back to you shortly!
        </h3>
      </div>
    );
  }

  if (user.isApproved === false)
    return (
      <div className="dashboard-container">
        <h3 style={styles.textStyle}>
          Your Application has been rejected, you wont be able to view and bid
          on ideas
        </h3>
        ;
      </div>
    );

  return (
    <div className="dashboard-container">
      <br />
      <br />
      <div>
        <h1>{user.firstName}'s Dashboard</h1>
      </div>

      <div className="items-wrapper">
        <div className="flex-ideacontainer">
          <Link className="links" to="/Cofounder/dashboard/ideas">
            <div className="assess-tiles">
              <img alt="icon" className="icons" src={assesWhite}></img>
              <h4>List of ideas</h4>
            </div>
          </Link>
        </div>
        <div className="flex-ideacontainer">
          <Link
            className="links"
            to={`/Cofounder/dashboard/${user.id}/profile`}
          >
            <div className="assess-tiles">
              <img alt="icon" className="icons" src={mentor}></img>
              <h4>Your profile</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  textStyle: {
    padding: "100px",
  },
};
