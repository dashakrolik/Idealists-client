import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import "../MyIdea/Dashboard/IdeaDashBoardDetail.css";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";
import Button from "../reogranisation/Questions/Button";
import ProgressBar from "../reogranisation/ProgressBar/ProgressBar";
import IdeaDetails from "../reogranisation/IdeaDetails/IdeaDetails";

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
      "Are you sure you want to undo the rejection of this idea? The user who submitted the idea has been notified via email about the rejection."
    );
    if (confirmUndoRejected) {
      setRejected(false);
      props.rejectIdea({ rejected: false }, ideasId);
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
            // console.log("success, idea progress moved forward");
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

  if (props.authState.loggedIn === false) {
    return <Redirect to="/MyIdea" />;
  }

  // This loop results in an array that determines the current phase and completed phase(s).
  // "is-done" and "current" refer to CSS class names used in the progress bar
  // the switch statement below the loop depends on this progressStep array

  // const progressStep = [""];
  // for (let i = 1; i <= 10; i++) {
  //   if (i === 1) {
  //     !progress.step01
  //       ? progressStep.push(`current`)
  //       : progressStep.push(`is-done`);
  //   } else {
  //     const step =
  //       progress[`step0${i}`] && !progress[`step0${i + 1}`]
  //         ? "is-done"
  //         : progress[`step0${i - 1}`]
  //         ? "current"
  //         : "";
  //     progressStep.push(step);
  //   }
  // }
  // console.log(progressStep);

  // this determines the index of the current phase, as setup for the switch statement

  const progressStep = (progress) => {
    for (let i = 1; i < 10; i++) {
      if (progress[`step0${i}`] && !progress[`step0${i + 1}`])
        return i === 1 ? 1 : i + 1;
    }
  };

  let currentStepIndex = progressStep(progress);

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
      nextPhaseName = "Co-Founder Phase";
      stepNameInEntity = { step07: true };
      break;
    case 8:
      nextPhaseName = "Funding Phase";
      stepNameInEntity = { step08: true };
      break;
    case 9:
      nextPhaseName = "Company is Born";
      stepNameInEntity = { step09: true };
      break;
    case 10:
      nextPhaseName = "Project Complete";
      stepNameInEntity = { step10: true };
      break;
    default:
      console.log("step not found");
  }

  return (
    <div className="dashboard-container">
      <Container>
        <Left>
          <ProgressBar
            token={props.authState.token}
            ideasId={props.match.params.id}
            progress={progress}
          />
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
            {rejected ? (
              <h2>
                <em>This idea has been rejected</em>
              </h2>
            ) : null}
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
