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
import ProgressBar from "../../reogranisation/ProgressBar/ProgressBar";
import IdeaDetails from "../../reogranisation/IdeaDetails/IdeaDetails";
import Spinner from "../../reogranisation/Spinner";

export default function IdeaDashboardDetail(props) {
  const [userIdeas, setUserIdeas] = useState([]);
  const [progress, setProgress] = useState([]);
  const [ideaOwner, setIdeaOwner] = useState({});
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showAssessmentSection, setShowAssessmentSection] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [comments, setComments] = useState([]);
  const [docs, setDocs] = useState([]);
  const [industryIdea, setIndustryIdea] = useState({});
  const ideasId = props.match.params.id;
  const [rejected, setRejected] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const rejectIdea = () => {
    const confirmRejected = window.confirm(
      "Are you sure you want to reject this idea? The user who submitted the idea will be immediately notified via email. Only the ADMIN can undo a rejection."
    );
    if (confirmRejected) {
      setRejected(true);
      props.rejectIdea({ rejected: true }, ideasId);
    }
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
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SpinnerStyle>
        <SpinnerPostion>
          <Spinner />
        </SpinnerPostion>
      </SpinnerStyle>
    );
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
      loading={props.location.state.loading}
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
      nextPhaseName = "Reload page first";
  }

  return (
    <div className="dashboard-container">
      <Container>
        <Left>
          <ProgressBar
            token={props.authState.token}
            ideasId={props.match.params.id}
          />
          {!rejected ? (
            <FlexRow>
              <FlexColumn>
                <StyledDiv>
                  <h1>Control Idea</h1>

                  <Button
                    color="inherit"
                    text="View Patent Check"
                    onClick={() =>
                      props.history.push(`/ideas/${ideasId}/automatch`)
                    }
                  />

                  {/* this button moves idea progress to the next phase, 
with conditions to validate that the user has the correct role. */}
                  <Button
                    color="inherit"
                    text={
                      (nextPhaseName !== undefined &&
                        currentStep === specialistStepNumber) || // match the current step to the specialists matched steps (which steps they can change an idea from)
                      (specialistType === "patent" && currentStep === 6) || // patent specialists can also move idea from phase 6
                      props.authState.user.role === "admin"
                        ? `Move to next phase: ${nextPhaseName}`
                        : nextPhaseName === undefined
                        ? "Idea has reached final phase"
                        : "Phase Updated"
                    }
                    onClick={
                      (nextPhaseName !== undefined &&
                        currentStep === specialistStepNumber) ||
                      props.authState.user.role === "admin" ||
                      (specialistType === "patent" && currentStep === 6)
                        ? () => updateProgressAPICall(stepNameInEntity)
                        : null
                    }
                  />
                  <Button
                    color="inherit"
                    text="Reject Idea"
                    onClick={() => rejectIdea()}
                  />
                </StyledDiv>
              </FlexColumn>
            </FlexRow>
          ) : null}
          <FlexRow>
            <FlexColumn>
              <StyledDiv>
                <h1>Downloads</h1>
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
              </StyledDiv>
            </FlexColumn>
          </FlexRow>
        </Left>
        <Right>
          <Content>
            {rejected ? (
              <h2>
                <em>This idea has been rejected</em>
              </h2>
            ) : null}

            <h1 className="header"> Questions and Answers about Idea:</h1>
            <IdeaDetails ideas={userIdeas} />
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

const SpinnerStyle = styled.div`
  display: flex;
  align-itmes: center;
  justify-content: center;
  background-image: linear-gradient(
    to right top,
    #1a3d7c,
    #195d9c,
    #1f7fbb,
    #31a2d7,
    #4cc5f1
  );
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 100%;
`;

const SpinnerPostion = styled.div`
  margin-top: 370px;
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
