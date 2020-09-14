import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import { Redirect, Link } from "react-router-dom";
import "./IdeaDashboard.css";
import assess from "../../../res/assess-white.png";

export default function IdeaDashboard(props) {
  const [user, setUserData] = useState({});
  const [userIdeas, setUserIdeas] = useState([]);

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => setUserData(res.body));
    else props.history.replace("/MyIdea/login");
  }, []);

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => setUserIdeas(res.body));
  }, []);

  if (props.authState.loggedIn === false) return <h1>Not logged in</h1>;
  
  if (!props.authState.user) {
    console.log(props.authState)
    props.user();
  }

  return (
    <div className="dashboard-container">
      <br />
      <br />
      <br />
      <div className="title">
        <h1>{user.firstName}'s Dashboard</h1>
      </div>
      <div className="flex-tilescontainer">
        <Link className="links" to="/dashboard/assess">
          <div className="assess-tiles">
            <img alt="icon" className="icons" src={assess}></img>
            <h4>Assess ideas</h4>
          </div>
        </Link>
      </div>
      {userIdeas.length < 1 ? (
        <h2 style={styledH2}>
          <a href="/MyIdea/new">Submit your first idea</a>
        </h2>
      ) : (
        <h2 style={styledH2}>
          Please follow your next step: your market check
        </h2>
      )}
      <div className="flex-tilescontainer">
        {userIdeas.map((idea) => (
          <Link
            key={idea.id}
            className="tile-link"
            to={`/dashboard/ideas/${idea.id}`}
          >
            <div className="idea-tile" key={idea.id}>
              <p>{idea.idea[5].answers[0].qAnswer}</p>
              <br />
              <p>{idea.idea[5].answers[1].qAnswer}</p>
              {idea.progress === null ||
                (idea.progress.step01 === true &&
                  idea.progress.step02 === true &&
                  idea.progress.step03 === false && (
                    <p>Status: First patent check </p>
                  ))}
              {idea.progress === null ||
                (idea.progress.step01 === true &&
                  idea.progress.step02 === true &&
                  idea.progress.step03 === true &&
                  idea.progress.step04 === false && (
                    <p>Status: Expert check </p>
                  ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styledH2 = {
  fontSize: 20,
  fontWeight: 800,
  color: "white",
};
