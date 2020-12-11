import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import "./IdeaDashBoardDetail.css";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";
import Button from "../../reogranisation/Questions/Button";
import ProgressBar from "../../reogranisation/ProgressBar/ProgressBar";
import IdeaDetails from "../../reogranisation/IdeaDetails/IdeaDetails";
import { useHistory } from "react-router-dom";


export default function IdeaDashboardDetail(props) {
  const [userIdeas, setUserIdeas] = useState([]);
  const [userId, setUserId] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const history = useHistory(); 

  const [progress, setProgress] = useState([]);

  const ideasId = props.match.params.id;

  if (props.authState.loggedIn === false) {
    return <Redirect to="/MyIdea" />;
  }

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideasId}`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => {
        setUserIdeas(res.body.idea);
        setUserId(res.body.user);
        setAssessments(res.body.assessments);
        if (
          res.body.user.id === props.authState.user.id &&
          res.body.idea.progress
        ) {
          if (
            res.body.idea.progress.rejected === true ||
            res.body.idea.progress.step02 === false ||
            res.body.idea.progress.step03 === true
          ) {
            return <Redirect to="/MyIdea/dashboard" />;
          }
        }
      });
  }, []);

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideasId}`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => {
        setProgress(res.body.progress);
      });
  }, [props.progress]);

  if (props.authState.loggedIn === false) {
    return <Redirect to="/MyIdea" />;
  }
  const renderLeft =
    userId.id === props.authState.user.id ? (
      <>
        <ProgressBar
          token={props.authState.token}
          ideasId={props.match.params.id}
        />{" "}
        {progress.step01 && !progress.step02 ? (
          <Button
            color="inherit"
            text="View Patent Check"
            onClick={() => props.history.push(`/ideas/${ideasId}/automatch`)}
          />
        ) : null}
      </>
    ) : (
      <FlexRow>
        <FlexColumn>
          <StyledDiv>
            <p>
              Here you get to assess ideas in a very simple and fast way and get
              rewarded for it at the same time. When an idea you helped assess
              becomes incorporated, you’ll receive € 100,- worth of equity in
              that company. Assessing an idea takes on average 3 minutes.
            </p>
            {assessments
              .map((ass) => ass.user.id)
              .includes(props.authState.user.id) ? (
              <h2>You have already assessed this idea!</h2>
            ) : (
              <Button
                color="inherit"
                text="Assess this idea"
                onClick={() =>
                  props.history.push(`/dashboard/assess/${ideasId}`)
                }
              />
            )}
          </StyledDiv>
        </FlexColumn>
      </FlexRow>
    );

  return (
    <div className="dashboard-container">
      <Container>
        <Left>
        <div style={{width: "12rem"}}>
        <Button text="Go back" onClick={() => history.goBack()}/>
          {renderLeft}
          </div>
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
