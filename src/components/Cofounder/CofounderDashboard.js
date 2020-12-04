import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import { Redirect, Link } from "react-router-dom";
import "../MyIdea/Dashboard/IdeaDashboard.css";
import ideaImg from "../../res/idea.png"
import submitIdea from "../../res/shareIdea.png"


export default function CofounderDashboard(props) {
  const [user, setUserData] = useState({});
  const [userIdeas, setUserIdeas] = useState([]);
  const [ideasList, setIdeaList] = useState([])

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => setUserData(res.body));
    else props.history.replace("/MyIdea/login");
  }, []);

  if (props.authState.loggedIn === false) return <h1>Not logged in</h1>;
  if (props.authState.isApproved === null) return <h1>Your Application is being reviewed</h1>;
  if (props.authState.isApproved === false) return <h1>Your Application has been rejected, you wont be able to view and bid on ideas</h1>;

  
  if (props.authState.isApproved === true)
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
          {/* <div className="flex-ideacontainer">
            <Link className="links" to="/MyIdea/new">
              <div className="assess-tiles">
                <img alt="icon" className="icons" src={submitIdea}></img>
                <h4>Submit your first idea</h4>
              </div>
            </Link>
          </div> */}
        </div>
      </div>
    );
}


