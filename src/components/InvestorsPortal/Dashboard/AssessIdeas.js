import React, { useEffect, useState, useContext } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import { Redirect, Link } from "react-router-dom";
import "./AssessIdeas.css";
import styled from "@emotion/styled";
import Button from "../../reogranisation/Questions/Button";
import posed from "react-pose";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { FileCreateNewFolder } from "material-ui/svg-icons";

export default function AssessIdeas(props) {
  const [userData, setUserData] = useState({});
  // const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [ideas, setIdeas] = useState([]);

  const [assessments, getAssessments] = useState([]);

  const [industries, setIndustries] = useState([]);

  const [selection, setSelection] = useState("show all");

  const [sortedIdeas, setSortedIdeas] = useState([]);

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
    // items for the  dropdown with all ideas' industries
    const ideasIndustries = ideas
      .map((idea) => idea.industryIdea)
      .map((arr) => arr.replace(/[{}"]/g, "").split(","))
      .flat()
      .filter((industry, index, arr) => arr.indexOf(industry) === index);
    // console.log("ideasIndustries", ideasIndustries);
    setIndustries(ideasIndustries);
  }, [ideas]);

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/assessments`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => getAssessments(res.body));
    else props.history.push("/InvestorStart");
  }, []);

  // const userLogout = () => {
  //   localStorage.removeItem('currentUserJwt');
  //   setUserLoggedIn(false);
  // };

  if (props.authState.LoggedIn === false) return <Redirect to="/login" />;

  if (!props.authState.user) {
    props.user();
  }

  //TOP - TESTING SORTING AND INDUSTRY SELECTION - NOT DONE YET!

  console.log("ideas", ideas);

  if (userData.industry && ideas[0]) {
    // Expert-Investor industries
    const expertIndustries = userData.industry.replace(/[{}"]/g, "").split(",");

    console.log("expertIndustries", expertIndustries);

    // Sorting ideas according to industries

    // console.log("industries", industries);
    ideas.sort((ideaA, ideaB) => {
      var index = 0;
      //extract an array of all industries in the Idea
      const ideasArr = ideaA.industryIdea.replace(/[{}"]/g, "").split(",");
      console.log("ideasArr", ideasArr);

      // for each Expert's industry check if it is in the Idea's array, if so move idea up
      expertIndustries.forEach((expInd) => {
        console.log(ideasArr.includes(expInd));
        index = ideasArr.includes(expInd) ? -ideasArr.length : 0;
        console.log("index", index);
      });
      console.log(ideaB.industryIdea.length);
      return index;
    });

    //BOTTOM - TESTING SORTING AND INDUSTRY SELECTION - NOT DONE YET!

    // const filterIdeas = ideas.filter(
    //   (idea) => idea.industryIdea.includes(selection)
    //   // console.log(idea.industryIdea.includes(selection));
    // );
  }

  // var filteredIdeas = undefined;
  const filterIdeas = (e) => {
    setSelection(e.target.value);
    let filteredIdeas = ideas.filter((idea) =>
      e.target.value === "show all"
        ? true
        : idea.industryIdea.includes(e.target.value)
    );
    setSortedIdeas(filteredIdeas);
    // console.log("selection", e.target.value);
    // console.log("filteredIdeas", filteredIdeas);
  };

  console.log("sortedIdeas", sortedIdeas);

  return (
    <div className="assessIdeas-container">
      <br />
      <div className="title">
        <h2>This is {userData.firstName}'s Expert dashboard</h2>
      </div>
      {sortedIdeas.length < 1 ? (
        <h2 style={styledH2}>
          <a href="/Investors/dashboard">
            Sorry There is no idea related with your industry selection!
          </a>
        </h2>
      ) : (
        <h2 style={styledH2}>
          Please check the ideas related with your industries
        </h2>
      )}

      <StyledCard>
        Here you get to assess ideas in a very simple and fast way and get
        rewarded for it at the same time. When an idea you helped assess becomes
        incorporated, you’ll receive € 100,- worth of equity in that
        company. Assessing an idea takes on average 3 minutes.
      </StyledCard>
      <br />
      <form
        className="demo"
        onChange={(e) => {
          filterIdeas(e);
        }}
      >
        <select
          id="industries"
          name="industries"
          className="dropdown-container"
        >
          <option value="show all">Choose an industry </option>
          {industries.map((idea) => (
            <option value={idea}>{idea}</option>
          ))}
        </select>
      </form>
      <div className="flex-tilescontainer">
        {sortedIdeas.map((idea) => (
          <Link
            key={idea.id}
            className="tile-link"
            to={`/investors/dashboard/assess/${idea.id}`}
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
                  <li>{industries.value}</li>
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
