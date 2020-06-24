import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import { Redirect, Link } from "react-router-dom";
import "../MyIdea/Dashboard/IdeaDashboard.css";
import posed from "react-pose";
import mentor from "../../res/mentor.png";

export default function AdminDashboard(props) {
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

  // to add a new specialist
  const showNewSpecialist = () => {
    if (!props.authState.user) return null;
    if (props.authState.user.role === "admin") {
      return (
        <Link className="links" to="/Admin/dashboard/newspecialist">
          <div className="invest-tile">
            <img className="icons" src={mentor}></img>
            <h4>Add Specialist</h4>
          </div>
        </Link>
      );
    } else return null;
  };

  if (props.authState.loggedIn === false) return <Redirect to="/MyIdea" />;

  if (!props.authState.user) {
    props.user();
  }

  return (
    <div className="dashboard-container">
      <br />
      <br />

      <br />
      <div className="title">
        <h1>{user.firstName}'s Admin Dashboard</h1>
      </div>
      <div className="flex-tilescontainer">{showNewSpecialist()}</div>

      <h2 style={styledH2}>Ideas:</h2>

      <div className="flex-tilescontainer">
        {userIdeas.map((idea) => {
          if (idea && !idea.progress.rejected) {
            return (
              <Link
                key={idea.id}
                className="tile-link"
                to={`/AdminDashboard/ideas/${idea.id}`}
              >
                <div className="idea-tile" key={idea.id}>
                  <p>
                    <strong>Title:</strong>
                  </p>
                  <p>{idea.idea[5].answers[0].qAnswer}</p>
                  <br />
                  <p>
                    <strong>Description:</strong>
                  </p>
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
            );
          }
        })}
      </div>
    </div>
  );
}

const styledH2 = {
  fontSize: 20,
  fontWeight: 800,
  color: "white",
};
