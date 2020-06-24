import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import "./SpecialistDashboard.css";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import { Redirect } from "react-router-dom";
import Button from "../../reogranisation/Questions/Button";
import { fetchDocs, openUploadWidget } from "./CloudinaryService";
import { Image } from "cloudinary-react";
import AssessmentSection from "./AssessmentSection/AssessmentSection";
import CommentSection from "./CommentSection/CommentSection";
import IdeaPDFCreator from "./Download/IdeaPDFCreator";
import AssessmentsPDFCreator from "./Download/AssessmentsPDFCreator";
import CommentsPDFCreator from "./Download/CommentsPDFCreator";
import FullPDFCreator from "./Download/FullPDFCreator";

export default function IdeaDashboardDetail(props) {
  const [userIdeas, setUserIdeas] = useState([]);
  const [progress, setProgress] = useState([]);
  const [ideaOwner, setIdeaOwner] = useState({});
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showAssessmentSection, setShowAssessmentSection] = useState(false);
  const [showIdeaDetails, setShowIdeaDetails] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [comments, setComments] = useState([]);
  const [docs, setDocs] = useState([]);
  const [industryIdea, setIndustryIdea] = useState({});
  const ideasId = props.match.params.id;

  const docsUploaded = (
    <section>
      {/* { === ideasId ?  */}
      {docs.map((i) => (
        <Image
          key={i}
          publicId={i}
          fetch-format="auto"
          quality="auto"
          dpr="auto"
          responsive
          width="auto"
          crop="scale"
          responsiveUseBreakpoints="true"
        ></Image>
      ))}
    </section>
  );

  // to be sure that specialists cannot update the progress phase that doesn't match their role,
  // the following code checks their specialist type and stores the number of the phase(s) they can change
  // to "specialistStepNumber". This way, we can compare the phase number the specialist is authorized to change,
  // with the current phase number
  const { specialistType } = props.authState.user;
  const specialistStepNumber =
    specialistType === "patent"
      ? 4
      : specialistType === "validation"
      ? 5
      : specialistType === "calculation" || specialistType === "subsidy"
      ? 7
      : null;

  console.log(
    "what phase number can this specialist change?",
    specialistStepNumber
  );
  console.log("whats the specialist type?", specialistType);

  const beginUpload = (tag) => {
    const uploadOptions = {
      cloudName: "idealists",

      tags: [tag, "Specialist Input"],

      uploadPreset: "upload",
    };

    openUploadWidget(uploadOptions, (error, doc) => {
      if (!error) {
        console.log("docs:", doc);
        if (doc.event === "success") {
          setDocs([...docs, doc.info.public_id]);
        }
      } else {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    fetchDocs(`IdeasId: ${ideasId}`, setDocs);
  }, []);

  if (props.authState.loggedIn === false) {
    return <Redirect to="/MyIdea" />;
  }

  // API call to update the progress phase when user moves it
  const updateProgressAPICall = (stepNameInEntity) => {
    const confirmPhaseUpdate = window.confirm(
      "Move idea progress to the next phase?"
    );
    // if the user selects "ok" in the window.confirm, it returns true. If the user cancels, it returns false
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
        setIdeaOwner(res.body.user);
        setProgress(res.body.progress);
        setUserIdeas(res.body.idea);
        setAssessments(res.body.assessments);
        setComments(res.body.comments);
        setIndustryIdea(res.body.industryIdea);
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

  const renderAssessmentSection = !showAssessmentSection ? (
    <>
      {assessments.length < 0 ? (
        <StyledCard>
          There are currently no assessments for this idea.
        </StyledCard>
      ) : (
        <StyledCard>
          <Button
            text="Show Assessments"
            onClick={() => setShowAssessmentSection(!showAssessmentSection)}
          />{" "}
        </StyledCard>
      )}
    </>
  ) : (
    <>
      <StyledCard>
        <Button
          text="Hide Assessments"
          onClick={() => setShowAssessmentSection(!showAssessmentSection)}
        />{" "}
      </StyledCard>
      <AssessmentSection
        assessments={assessments}
        industryIdea={industryIdea}
      />
      <StyledCard>
        <Button
          text="Hide Assessments"
          onClick={() => setShowAssessmentSection(!showAssessmentSection)}
        />{" "}
      </StyledCard>
    </>
  );

  const renderIndustryList = (industries) => {
    if (!industryIdea) return null;
    else {
      const ideaIndustryArr = JSON.stringify(industries)
        .replace(/[{}"]/g, "")
        .replace(/\\/g, "")
        .split(",");

      if (ideaIndustryArr.length < 1) return null;
      else
        return (
          <ul style={{ listStyle: "none" }}>
            {ideaIndustryArr.map((indu) => (
              <li key={indu}>{indu}</li>
            ))}
          </ul>
        );
    }
  };

  const renderIdeaDetails = !showIdeaDetails ? (
    <>
      {" "}
      <div key="1">
        <StyledCard>
          <h4>{qTitles[5]}:</h4>
          <p>{qAnswers[5]}</p>
        </StyledCard>
      </div>
      <div key="2">
        <StyledCard>
          <h4>{qTitles[6]}:</h4>
          <p>{qAnswers[6]}</p>
        </StyledCard>
      </div>
      {industryIdea ? (
        <StyledCard>
          <h4>Industries</h4>
          {renderIndustryList(industryIdea)}
        </StyledCard>
      ) : null}
      <StyledCard>
        <Button
          text="Show details"
          onClick={() => setShowIdeaDetails(!showIdeaDetails)}
        />
      </StyledCard>
    </>
  ) : (
    <>
      <StyledCard>
        <Button
          text="Hide details"
          onClick={() => setShowIdeaDetails(!showIdeaDetails)}
        />
      </StyledCard>
      {qTitles.map((title, index) => (
        <div key={index}>
          <StyledCard>
            <h4>{title}:</h4>
            <p>{qAnswers[index]}</p>
          </StyledCard>
        </div>
      ))}
      <StyledCard>
        <Button
          text="Hide details"
          onClick={() => setShowIdeaDetails(!showIdeaDetails)}
        />
      </StyledCard>
    </>
  );

  const renderCommentSection = !showCommentSection ? (
    <>
      <StyledCard>
        <Button
          text="Show Comments"
          onClick={() => setShowCommentSection(!showCommentSection)}
        />
      </StyledCard>
    </>
  ) : (
    <CommentSection
      id={ideasId}
      authState={props.authState}
      show={(e) => {
        setShowCommentSection(e);
      }}
    />
  );

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
  }

  // this determines the index of the current phase, as setup for the switch statement
  let currentStep = progressStep.indexOf("current");

  let nextPhaseName;
  let stepNameInEntity;

  switch (currentStep) {
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

  console.log(
    "current step:",
    currentStep,
    "specialist can change steps:",
    specialistStepNumber
  );

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
          <div>
            {/* <Button
              color="inherit"
              text="Patent Check"
              onClick={() => props.history.push(`/ideas/${ideasId}/automatch`)}
            /> */}

            {/* this button moves idea progress to the next phase, 
with conditions to validate that the user has the correct role. */}
            <Button
              color="inherit"
              text={
                (nextPhaseName !== undefined &&
                  currentStep === specialistStepNumber) || // match the current step to the specialists matched steps (which steps they can change an idea from)
                (specialistType === "patent" && currentStep === 6) // patent specialists can also move idea from phase 6
                  ? `Move to next phase: ${nextPhaseName}`
                  : nextPhaseName === undefined
                  ? "Idea has reached final phase"
                  : "Phase Updated"
              }
              onClick={
                (nextPhaseName !== undefined &&
                  currentStep === specialistStepNumber) ||
                (specialistType === "patent" && currentStep === 6)
                  ? () => updateProgressAPICall(stepNameInEntity)
                  : null
              }
            />

            <IdeaPDFCreator
              user={ideaOwner}
              ideaId={ideasId}
              idea={userIdeas}
              printer={props.authState.user}
            />
            <AssessmentsPDFCreator
              user={ideaOwner}
              ideaId={ideasId}
              idea={userIdeas}
              printer={props.authState.user}
              assessments={assessments}
            />
            <CommentsPDFCreator
              user={ideaOwner}
              ideaId={ideasId}
              idea={userIdeas}
              printer={props.authState.user}
              comments={comments}
            />
            <FullPDFCreator
              user={ideaOwner}
              ideaId={ideasId}
              idea={userIdeas}
              printer={props.authState.user}
              comments={comments}
              assessments={assessments}
            />
          </div>
        </Left>
        <Right>
          <Content>
            <h1 className="header"> Questions and Answers about Idea:</h1>
            {renderIdeaDetails}
          </Content>

          <div
            className="assessment-section"
            style={{
              alignSelf: "center",
              justifySelf: "center",
              color: "#ffffff",
              width: "90vw",
              maxWidth: "800px",
              height: "auto",
              padding: "20px",
            }}
          >
            <h1 className="header"> Assessments:</h1>
            {renderAssessmentSection}
          </div>
          <div
            className="comment-section"
            style={{
              alignSelf: "center",
              justifySelf: "center",
              color: "#ffffff",
              width: "90vw",
              maxWidth: "800px",
              height: "auto",
              padding: "20px",
            }}
          >
            <h1 className="header"> Specialist Comments</h1>
            {renderCommentSection}
          </div>
          <Content>
            <h1 className="header"> Specialist input:</h1>
            <StyledCard>
              {docsUploaded}
              <form>
                <Button
                  text="Upload Doc"
                  onClick={() => beginUpload(`IdeasId: ${ideasId}`)}
                />
              </form>
            </StyledCard>
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
