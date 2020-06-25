import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import { Redirect, Link } from "react-router-dom";
import "./UserAssessIdeas.css";
import styled from "@emotion/styled";
import Button from "../../reogranisation/Questions/Button";
import Card from "@material-ui/core/Card";

export default function UserAssessIdeas(props) {
  const [userData, setUserData] = useState({});
  // const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [ideas, setIdeas] = useState([]);
  const [industries, setIndustries] = useState([]);
  // const [selection, setSelection] = useState("show all");
  const [sortedIdeas, setSortedIdeas] = useState([]);

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => setUserData(res.body));
    else props.history.push("/MyIdea/login");
  }, []);

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/ideas/all`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => {
          setIdeas(res.body);
          setSortedIdeas(res.body);
        });
  }, []);

  useEffect(() => {
    // extracting all items for the dropdown selector with all ideas' industries
    const ideasIndustries = ideas
      .map((idea) => idea.industryIdea)
      .map((arr) => arr.replace(/[{}"]/g, "").split(","))
      .flat()
      .filter((industry, index, arr) => arr.indexOf(industry) === index)
      .sort((a, b) => a.localeCompare(b));
    setIndustries(ideasIndustries);
  }, [ideas]);

  if (props.authState.LoggedIn === false) return <Redirect to="/login" />;

  if (!props.authState.user) {
    props.user();
  }

  // filtering ideas by industries
  const filterIdeas = (e) => {
    // setSelection(e.target.value);
    let filteredIdeas = ideas.filter((idea) =>
      e.target.value === "show all"
        ? true
        : idea.industryIdea.includes(e.target.value)
    );
    setSortedIdeas(filteredIdeas);
  };

  return (
    <div className="assessIdeas-container">
      <br />
      <div className="title">
        <h2>Assess ideas here</h2>
      </div>
      {ideas.length < 1 ? (
        <>
          <h2 style={styledH2}>
            Sorry, there are currently no ideas for you to assess.
          </h2>
          <div style={{ width: "12rem", margin: "auto" }}>
            <Link to={`/MyIdea/dashboard`}>
              <Button color="inherit" text="Go back" />
            </Link>
          </div>
          <br></br>
        </>
      ) : null}

      <StyledCard>
        Here you get to assess ideas in a very simple and fast way and get
        rewarded for it at the same time. When an idea you helped assess becomes
        incorporated, you’ll receive € 100,- worth of equity in that company.
        Assessing an idea takes on average 3 minutes.
      </StyledCard>
      <br />
      {ideas.length < 1 ? null : (
        <form
          className="dropdown"
          onChange={(e) => {
            filterIdeas(e);
          }}
        >
          <p className="dropdown-label">Select an industry:</p>
          <select
            id="industries"
            name="industries"
            className="dropdown-container"
          >
            <option className="showAll" value="show all">
              Show all
            </option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </form>
      )}
      <div className="flex-tilescontainer">
        {sortedIdeas.map((idea) => (
          <Link
            key={idea.id}
            className="tile-link"
            to={`/dashboard/ideas/${idea.id}`}
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
              <p style={{ color: "black" }}>
                <b>Industries: </b>
                {idea.idea[4].answers[0].qAnswer.map((industries) => (
                  <li key={industries.value}>{industries.value}</li>
                ))}
              </p>
            </div>
          </Link>
        ))}
      </div>
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
`;
