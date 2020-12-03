import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import { Redirect, Link } from "react-router-dom";
import "../MyIdea/Dashboard/IdeaDashboard.css";
import mentor from "../../res/mentor.png";
import assess from "../../res/assess-white.png";
import { useHistory } from "react-router-dom";
import Button from '../reogranisation/Questions/Button';



export default function AdminDashboard(props) {
  const [user, setUserData] = useState({});
  const [userIdeas, setUserIdeas] = useState([]);
  const history = useHistory(); 


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
        <Link className="links" to="/AdminDashboard/newspecialist">
          <div className="invest-tile">
            <img className="icons" src={mentor} alt="mentor icon"></img>
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
      <div>
      <Button text="Previous" onClick={() => history.goBack()}/>
      </div>
      <div className="title">
        <h1>{user.firstName}'s Admin Dashboard</h1>
      </div>
      <div className="flex-tilescontainer">
        {showNewSpecialist()}{" "}
        <Link className="links" to="/AdminDashboard/rejected">
          <div className="invest-tile">
            <img className="icons" src={assess} alt="assessment icon"></img>
            <h4>Rejected Ideas</h4>
          </div>
        </Link>
      </div>
      <h2 style={styledH2}>Ideas:</h2>

      <div className="flex-tilescontainer">
        {userIdeas.map((idea) => {
          return (
            idea &&
            !idea.progress.rejected && (
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
            )
          );
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
