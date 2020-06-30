import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import "./InvestorIdeaDetails.css";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";
import Button from "../../reogranisation/Questions/Button";
import ProgressBar from "../../reogranisation/ProgressBar/ProgressBar";
import IdeaDetails from "../../reogranisation/IdeaDetails/IdeaDetails";

export default function IdeaDashboardDetail(props) {
  const [userIdeas, setUserIdeas] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const ideasId = props.match.params.id;

  if (props.authState.loggedIn === false) {
    return <Redirect to="/MyIdea" />;
  }
  if (!props.authState.user) {
    return <Redirect to="/MyIdea" />;
  } else if (props.authState.user.role === "user") {
    return <Redirect to="/MyIdea" />;
  }

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideasId}`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => {
        setUserIdeas(res.body.idea);
        setAssessments(res.body.assessments);
      });
  }, []);

  if (props.authState.loggedIn === false) {
    return <Redirect to="/MyIdea" />;
  }

  const renderButton = assessments
    .map((ass) => ass.user.id)
    .includes(props.authState.user.id) ? (
    <h2>You have already assessed this idea!</h2>
  ) : (
    <Button
      color="inherit"
      text="Assess this idea"
      onClick={() =>
        props.history.push(`/Investors/dashboard/assess/${ideasId}`)
      }
    />
  );

  return (
    <div className="dashboard-container">
      <Container>
        <Left>
          <FlexRow>
            <FlexColumn>
              <StyledDiv>
                <p>
                  Here you get to assess ideas in a very simple and fast way and
                  get rewarded for it at the same time. When an idea you helped
                  assess becomes incorporated, you’ll receive € 100,- worth of
                  equity in that company. Assessing an idea takes on average 3
                  minutes.
                </p>
                {renderButton}
              </StyledDiv>
            </FlexColumn>
          </FlexRow>
          <ProgressBar
            token={props.authState.token}
            ideasId={props.match.params.id}
          />
        </Left>

        <Right>
          <Content>
            <h1 className="header"> Questions and Answers about Idea:</h1>
            <IdeaDetails ideas={userIdeas} />
          </Content>
        </Right>
      </Container>
    </div>
  );
}

const StyledDiv = styled.div`
  margin: 0 auto;
  width: 330px;
  font-family: "Helvetica";
  font-size: 14px;
  border: 1px solid #ccc;
  padding: 20px;
  color: white;
  margin-bottom: 20px;
  margin-top: 45px;
`;

const Left = styled.div`
  grid-area: left;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding-top: 100px;
  padding-left: 30px;
`;

const FlexRow = styled.div`
  display: flex;
  @media only screen and (orientation: portrait) {
    flex-direction: column;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex: 1;
`;

const Content = styled.div`
  align-self: center;
  justify-self: center;
  color: #ffffff;
  width: 90vw;
  max-width: 800px;
  height: auto;
  padding: 20px;
`;

const Right = styled.div`
  grid-area: right;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding-top: 100px;
`;

const Container = styled.div`
  width: 100vw;

  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";
  background-image: linear-gradient(
    to right top,
    #1a3d7c,
    #195d9c,
    #1f7fbb,
    #31a2d7,
    #4cc5f1
  );
`;
