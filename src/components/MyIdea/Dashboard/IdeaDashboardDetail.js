import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import "./IdeaDashBoardDetail.css";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import { Redirect } from "react-router-dom";
import Button from "../../reogranisation/Questions/Button";

export default function IdeaDashboardDetail(props) {
  const [userIdeas, setUserIdeas] = useState([]);
  const [progress, setProgress] = useState([]);

  const ideasId = props.match.params.id;

  if (props.authState.loggedIn === false) {
    return <Redirect to="/MyIdea" />;
  }

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideasId}`)
      .set("Authorization", `Bearer ${props.authState.token}`)


      //   .then((res) => console.log("res.body", res.body));

      .then((res) => {
        setProgress(res.body.progress);
        setUserIdeas(res.body.idea);
      });

  }, []);

  const processTitle = (title) => {
    let splitTitle = title.split("?");
    const processedTitle = splitTitle[0];
    return processedTitle;
  };

  let qAnswers = [];
  const qTitles = [];
  userIdeas.map((idea) => {
    idea.answers.map((question) => {
      if (question.qTitle.length > 50) {
        const title = processTitle(question.qTitle);
        qTitles.push(title);
      } else {
        qTitles.push(question.qTitle);
      }
    });
  });

  userIdeas.map((idea) => {
    idea.answers.map((answer) => {
      qAnswers.push(answer.qAnswer);
    });
  });

  qAnswers = qAnswers.map((answer) =>
    typeof answer === "object"
      ? answer[1]
        ? answer[1].value + " & " + answer[0].value
        : answer[0]
        ? answer[0].value
        : answer.value
      : answer
  );

  if (qAnswers[0] === "true") {
    qAnswers[0] = "yes";
  }

  if (props.authState.loggedIn === false) {
    return <Redirect to="/MyIdea" />;
  }


  const progressStep = [""];
  // console.log("progress", progress);

  for (let i = 1; i < 10; i++) {
    // console.log("steps", progress[`step0${i - 1}`]);
    const step = progress[`step0${i}`]
      ? "is-done"
      : progress[`step0${i - 1}`]
      ? "current"
      : "";
    progressStep.push(step);
  }


  return (
    <div className="dashboard-container">
      <Container>
        <Left>
          <FlexRow>
            <FlexColumn>
              <StyledDiv>
                <h1>Assessing Your Idea:</h1>
                <hr />
                <ul className="step-progress">

                  <li className={`step-progress-item ${progressStep[1]}`}>
                    <strong>Submit your idea</strong>
                  </li>
                  <li className={`step-progress-item ${progressStep[2]}`}>
                    <strong>First patent check (1 week)</strong>
                  </li>
                  <li className={`step-progress-item ${progressStep[3]}`}>
                    <strong>Expert check (2 weeks)</strong>
                  </li>
                  <li className={`step-progress-item ${progressStep[4]}`}>
                    <strong>Second patent check (2 weeks)</strong>
                  </li>
                  <li className={`step-progress-item ${progressStep[5]}`}>
                    <strong>Validation phase (4 weeks)</strong>
                  </li>
                  <li className={`step-progress-item ${progressStep[6]}`}>
                    <strong>Final patent check (2 weeks)</strong>
                  </li>
                  <li className={`step-progress-item ${progressStep[7]}`}>
                    <strong>Business plan phase (2 weeks)</strong>
                  </li>
                  <li className={`step-progress-item ${progressStep[8]}`}>
                    <strong>Funding phase (2 weeks)</strong>
                  </li>
                  <li className={`step-progress-item ${progressStep[9]}`}>

                    <strong>Company is born (1 week)</strong>
                  </li>
                </ul>
              </StyledDiv>
            </FlexColumn>
          </FlexRow>
          <div>
            <Button
              color="inherit"
              text="Patent Check"
              onClick={() => props.history.push(`/ideas/${ideasId}/automatch`)}
            />
          </div>
        </Left>
        <Right>
          <Content>
            <h1 className="header"> Questions and Answers about Idea:</h1>
            {qTitles.map((title, index) => (
              <div key={index}>
                <StyledCard>
                  <h4>{title}:</h4>
                  <p>{qAnswers[index]}</p>
                </StyledCard>
              </div>
            ))}
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
const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding-left: 8px;
  padding-right: 8px;
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
  max-height: 2000px;
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
