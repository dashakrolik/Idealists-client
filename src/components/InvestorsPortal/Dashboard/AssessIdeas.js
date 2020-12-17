import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import { Redirect, Link } from "react-router-dom";
import "./AssessIdeas.css";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import Button from "../../reogranisation/Questions/Button";
import { useHistory } from "react-router-dom";

export default function AssessIdeas(props) {
  const [userData, setUserData] = useState({});
  // const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [ideas, setIdeas] = useState([]);
  // const [assessments, getAssessments] = useState([]);
  const [industries, setIndustries] = useState([]);
  // const [selection, setSelection] = useState("show all");
  const [sortedIdeas, setSortedIdeas] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => setUserData(res.body));
    else props.history.push("/InvestorStart");
  }, []);

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/ideas`)
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

  // useEffect(() => {
  //   if (props.authState.loggedIn)
  //     request
  //       .get(`${baseUrl}/assessments`)
  //       .set("Authorization", `Bearer ${props.authState.token}`)
  //       .then((res) => getAssessments(res.body));
  //   else props.history.push("/InvestorStart");
  // }, []);

  // const userLogout = () => {
  //   localStorage.removeItem('currentUserJwt');
  //   setUserLoggedIn(false);
  // };

  if (props.authState.LoggedIn === false) return <Redirect to="/login" />;

  if (!props.authState.user) {
    props.user();
  }

  if (userData.industry && ideas[0]) {
    // Expert-Investor industries
    const expertIndustries = userData.industry.replace(/[{}"]/g, "").split(",");
    // Sorting ideas according to expert industries
    sortedIdeas.sort((ideaA, ideaB) => {
      //extract an array of all industries in an idea
      const ideaIndustryArr = ideaA.industryIdea
        .replace(/[{}"]/g, "")
        .split(",");
      // check whether above array contains any of the expert industries and set index accordingly for sorting (-1 - move to the front, 0 - no change)
      var index = ideaIndustryArr.some((industry) =>
        expertIndustries.includes(industry)
      )
        ? -1
        : 0;

      return index;
    });
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
        <h2>This is {userData.firstName}'s Expert dashboard</h2>
        <div style={{ width: "12rem", margin: "auto", paddingTop: "50px" }}>
          <Button text="Go back" onClick={() => history.goBack()} />
        </div>
      </div>

      {ideas.length < 1 ? (
        <>
          <h2 style={styledH2}>
            Sorry, there are currently no ideas for you to assess.
          </h2>
          <div style={{ width: "12rem", margin: "auto" }}>
            <Link to={`/Investors/dashboard`}>
              <Button color="inherit" text="Go back" />
            </Link>
          </div>
          <br></br>
        </>
      ) : (
        <h2 style={styledH2}>
          Please check the ideas related with your industries
        </h2>
      )}
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
            to={`/investors/dashboard/idea/${idea.id}`}
          >
            <div className="assess-tile" key={idea.id}>
              <p>
                <b>Title: </b>
                <br />
                {idea.idea[5].answers[0].qAnswer}
              </p>
              <br />
              <p>
                <b>Description: </b>
                <br />
                {idea.idea[5].answers[1].qAnswer}
              </p>
              <br />
              <p>
                <b>Industries: </b>
                {idea.idea[4].answers[0].qAnswer.map((industries) => (
                  <li key={industries.value}>{industries.value}</li>
                ))}
              </p>

              {/* {idea.progress.step01 === true &&
                  idea.progress.step02 === true &&
                  idea.progress.step03 === false && <p>Status: First patent check </p>}
                {idea.progress.step01 === true &&
                  idea.progress.step02 === true &&
                  idea.progress.step03 === true &&
                  idea.progress.step04 === false && <p>Status: Expert check </p>} */}
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
