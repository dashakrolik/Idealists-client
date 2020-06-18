import React, { useEffect, useState, useContext } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import { Redirect, Link } from "react-router-dom";
import "./SpecialistDashboard.css";
import mentor from "../../../res/mentor.png";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
// import assess from '../../../res/assess-white.png'
// import invest from '../../../res/invest-white.png'

// import crowdfunding from '../../../res/crowdfunding.png'

export default function specialistDashboard(props) {
  const [userData, setUserData] = useState({
    specialistType: "Not a specialist",
  });
  const [ideaList, setIdeaList] = useState(false);
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

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/specialist`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => setIdeaList(res.body));
  }, []);

  if (userLoggedIn === false) return <Redirect to="/Specialist/login" />;

  //this below should go in new ADMIN dashboard
  const showNewSpecialist =
    props.authState.user.role === "admin" ? (
      <Link className="links" to="/Admin/dashboard/newspecialist">
        <div className="invest-tile">
          <img className="icons" src={mentor}></img>
          <h4>Add Specialist</h4>
        </div>
      </Link>
    ) : null;

  const renderTitle =
    userData && props.authState.user ? (
      <h2 className="title">
        {userData.firstName}'s{" "}
        {props.authState.user.specialistType.charAt(0).toUpperCase() +
          props.authState.user.specialistType.slice(1)}{" "}
        Specialist Dashboard
      </h2>
    ) : null;

  const renderIdeaList = () => {
    if (ideaList.length < 1) {
      return (
        <h2 style={styledH2}>
          There are no idea's available in your relevant phase(s)
        </h2>
      );
    }
    if (props.authState.user.specialistType === "patent") {
      const render4 = ideaList.ideasPhase4.map((idea) => (
        <Link
          key={idea.id}
          className="tile-link"
          to={`/specialist/dashboard/${idea.id}`}
        >
          <div className="assess-tile" key={idea.id}>
            <p style={{ color: "black" }}>
              <b>Title: </b>
              <br />
              {idea.idea[5].answers[0].qAnswer}
            </p>
            <br />
            <p style={{ color: "black" }}>
              <b>Description: </b>
              <br />
              {idea.idea[5].answers[1].qAnswer}
            </p>
            <br />
          </div>
        </Link>
      ));
      const card = renderCard("patent2");
      const render6 = ideaList.ideasPhase4.map((idea) => (
        <Link
          key={idea.id}
          className="tile-link"
          to={`/specialist/dashboard/${idea.id}`}
        >
          <div className="assess-tile" key={idea.id}>
            <p style={{ color: "black" }}>
              <b>Title: </b>
              <br />
              {idea.idea[5].answers[0].qAnswer}
            </p>
            <br />
            <p style={{ color: "black" }}>
              <b>Description: </b>
              <br />
              {idea.idea[5].answers[1].qAnswer}
            </p>
            <br />
          </div>
        </Link>
      ));
      if (ideaList.ideasPhase4.length < 1 && ideaList.ideasPhase6.length < 1) {
        return (
          <>
            {renderCard(props.authState.user.specialistType)}
            <div className="flex-tilescontainer">
              <h2 style={styledH2}>
                There are no idea's available in your relevant phase
              </h2>
            </div>{" "}
            {card}
            <div className="flex-tilescontainer">
              <h2 style={styledH2}>
                There are no idea's available in your relevant phase
              </h2>
            </div>
          </>
        );
      }
      if (ideaList.ideasPhase4.length < 1 && ideaList.ideasPhase6.length >= 1) {
        return (
          <>
            {renderCard(props.authState.user.specialistType)}
            <div className="flex-tilescontainer">
              <h2 style={styledH2}>
                There are no idea's available in your relevant phase
              </h2>
            </div>

            {card}
            <div className="flex-tilescontainer">{render6}</div>
          </>
        );
      }
      if (ideaList.ideasPhase4.length >= 1 && ideaList.ideasPhase6.length < 1) {
        return (
          <>
            {renderCard(props.authState.user.specialistType)}
            <div className="flex-tilescontainer">{render4}</div>

            {card}
            <div className="flex-tilescontainer">
              <h2 style={styledH2}>
                There are no idea's available in your relevant phase
              </h2>
            </div>
          </>
        );
      } else
        return (
          <>
            {renderCard(props.authState.user.specialistType)}
            <div className="flex-tilescontainer">{render4}</div>

            {card}
            <div className="flex-tilescontainer">{render6}</div>
          </>
        );
    } else
      return ideaList.map((idea) => (
        <div className="flex-tilescontainer">
          {props.authState.user.role === "admin"
            ? null
            : renderCard(props.authState.user.specialistType)}
          <Link
            key={idea.id}
            className="tile-link"
            to={`/specialist/dashboard/${idea.id}`}
          >
            <div className="assess-tile" key={idea.id}>
              <p style={{ color: "black" }}>
                <b>Title: </b>
                <br />
                {idea.idea[5].answers[0].qAnswer}
              </p>
              <br />
              <p style={{ color: "black" }}>
                <b>Description: </b>
                <br />
                {idea.idea[5].answers[1].qAnswer}
              </p>
              <br />
            </div>
          </Link>
        </div>
      ));
  };

  function specialistPhase(type) {
    if (type === "patent") return "4";
    if (type === "patent2") return "6";
    if (type === "validation") return "5";
    if (type === "calculation" || type === "subsidy") return "7";
  }
  const renderCard = (type) => {
    if (!props.authState.user) return null;
    else
      return (
        <StyledCard>
          Here are the ideas that are currently in phase {specialistPhase(type)}
          .<p>You can view and edit the ideas.</p>
        </StyledCard>
      );
  };

  return (
    <div className="dashboard-container">
      {renderTitle}
      <div className="flex-tilescontainer">{showNewSpecialist}</div>

      {ideaList ? renderIdeaList() : null}
    </div>
  );
}

const styledH2 = {
  fontSize: 20,
  fontWeight: 400,
  color: "white",
};

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding: 50px;
  width: 500px;
  margin: auto;
  color: white;
  display: flex;
  flex-direction: column;
`;
