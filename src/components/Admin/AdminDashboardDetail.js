import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import "../MyIdea/Dashboard/IdeaDashBoardDetail.css";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import { Redirect } from "react-router-dom";
import Button from "../reogranisation/Questions/Button";

export default function IdeaDashboardDetail(props) {
  const [userIdeas, setUserIdeas] = useState([]);
  const [progress, setProgress] = useState([]);
  const [rejected, setRejected] = useState(false);
  const ideasId = props.match.params.id;
  

  const rejectIdea = () => {
    const confirmRejected = window.confirm(
      "Are you sure you want to reject this idea? The user who submitted the idea will be immediately notified via email."
    );
    if (confirmRejected) {
      // if the user selects "ok" in the window.confirm, it returns true. If the user cancels, it returns false
      setRejected(true);
      props.rejectIdea({ rejected: true }, ideasId);
    }
  };

  const undoRejection = () => {
    const confirmUndoRejected = window.confirm(
      "Are you sure you want to undo the rejection of this idea?"
    );
    if (confirmUndoRejected) {
      setRejected(false);
      props.rejectIdea({ rejected: false}, ideasId);
    }
  };

  if (props.authState.loggedIn === false) {
    return <Redirect to="/MyIdea" />;
  }

  // API call to update the progress phase when user moves it
  const updateProgressAPICall = (stepNameInEntity) => {
    const confirmPhaseUpdate = window.confirm(
      "Move idea progress to the next phase?"
    );
    if (confirmPhaseUpdate && stepNameInEntity !== undefined) {
      request
        .put(`${baseUrl}/ideas/${ideasId}/progress`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .send(stepNameInEntity)
        .then((res) => {
          if (res.status === 200) {
            console.log("success, idea progress moved forward");
            setProgress(res.body);
          }
        })
        .catch((err) => {
          if (err) {
            console.log("error", err);
          }
        });
    } else return null;
  };

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideasId}`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => {
        setUserIdeas(res.body.idea);
        setProgress(res.body.progress);
        setRejected(res.body.progress.rejected);
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

  // This loop results in an array that determines the current phase and completed phase(s).
  // "is-done" and "current" refer to CSS class names used in the progress bar
  // the switch statement below the loop depends on this progressStep array
  const progressStep = [""];
  for (let i = 1; i < 10; i++) {
    const step = progress[`step0${i}`]
      ? "is-done"
      : progress[`step0${i - 1}`]
      ? "current"
      : "";
    progressStep.push(step);
    // console.log("progress step:", progressStep);
  }

  // this determines the index of the current phase, as setup for the switch statement
  let currentStepIndex = progressStep.indexOf("current");

  let nextPhaseName;
  let stepNameInEntity;

  switch (currentStepIndex) {
    case 1:
      nextPhaseName = "First Patent Check"; // used in the button text
      stepNameInEntity = { step01: true }; // sent in body req to server
      break;
    case 2:
      nextPhaseName = "Expert Check";
      stepNameInEntity = { step02: true };
      break;
    case 3:
      nextPhaseName = "Second Patent Check";
      stepNameInEntity = { step03: true };
      break;
    case 4:
      nextPhaseName = "Validation Phase";
      stepNameInEntity = { step04: true };
      break;
    case 5:
      nextPhaseName = "Final Patent Check";
      stepNameInEntity = { step05: true };
      break;
    case 6:
      nextPhaseName = "Business Plan Phase";
      stepNameInEntity = { step06: true };
      break;
    case 7:
      nextPhaseName = "Funding Phase";
      stepNameInEntity = { step07: true };
      break;
    case 8:
      nextPhaseName = "Company Is Born";
      stepNameInEntity = { step08: true };
      break;
    case 9:
      nextPhaseName = "Final Phase";
      stepNameInEntity = { step09: true };
      break;
    case 10:
      nextPhaseName = "Project Complete";
      stepNameInEntity = { step10: true };
  }

  return (
    <div className="dashboard-container">
      <Container>
        <Left>
          <FlexRow>
            <FlexColumn>
              <StyledDiv>
                <h1>Assessing Idea:</h1>
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
          <FlexRow>
            <FlexColumn>
              <StyledDiv>
                <h1>Control Idea</h1>
                {rejected ? (
                  <Button
                    color="inherit"
                    text="Undo Rejection"
                    onClick={() => undoRejection()}
                  />
                ) : (
                  <>
                     <Button
              color="inherit"
              text={
                nextPhaseName !== undefined
                  ? `Move to next phase: ${nextPhaseName}`
                  : nextPhaseName === undefined
                  ? "Idea has reached final phase"
                  : "Phase Updated"
              }
              onClick={
                nextPhaseName !== undefined
                  ? () => updateProgressAPICall(stepNameInEntity)
                  : null
              }
            />
                    <Button
                      color="inherit"
                      text="Reject Idea"
                      onClick={() => rejectIdea()}
                    />
                  </>
                )}
              </StyledDiv>
            </FlexColumn>
          </FlexRow>

        </Left>
        <Right>
          <Content>
            <h1 className="header">
              Admin View | Questions and Answers about Idea:
            </h1>
            {progress.length !== 0 && (rejected || progress.rejected) && (
              <h2>
                <em>This idea has been rejected</em>
              </h2>
            )}

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
