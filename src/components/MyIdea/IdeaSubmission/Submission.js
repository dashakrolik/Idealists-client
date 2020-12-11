/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import jsonFormData from "./idea-form-v1";
import { PoseGroup } from "react-pose";
import posed from "react-pose";
import QuestionGroup from "../../reogranisation/Questions/QuestionGroup";
import Button from "../../reogranisation/Questions/Button";
import SubmissionSideScreen from "./SubmissionSideScreen";
import CompleteSubmission from "./CompleteSubmission";

const Submission = (props) => {
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeGroupComplete, setActiveGroupComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inputFocused, setInputFocused] = useState(0);
  const [answers, setAnswers] = useState({
    0: "",
    1: "",
    2: "",
    3: [],
    4: [],
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
  });
  const [valueDecideProfit, setValueDecideProfit] = useState(false);
  const [valueDecideSdg, setValueDecideSdg] = useState(false);
  const [agreementSection, setAgreementSection] = useState(false);
  const questionGroups = [...jsonFormData];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
console.log("submission.js value.3", answers[3])
  useEffect(() => {
    setProgress(activeGroup / questionGroups.length);
  }, [activeGroup]);

  if (!props.authState.user) {
    props.user();
  }
const handleAnswers = (id, value) => {
    const new_answers = {...answers, [id]: value};
    // new_answers[id] = value;
    setAnswers(new_answers);
  };

  // const handleAnswers = (id, value) => {
  //   const new_answers = answers;
  //   new_answers[id] = value;
  //   setAnswers(new_answers);
  // };

  // const handleAnswers = (id, value) => {
  //   setAnswers({
  //     ...answers,
  //     [activeGroup]: {
  //       ...answers[activeGroup],
  //       [id]: value,
  //     },
  //   });
  // };
  // console.log("Answers in submissions", answers);
  const handleNextBttnClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    // console.log(activeGroup, questionGroups.length)
    if (activeGroup === questionGroups.length) {
      // console.log(activeGroup, questionGroups.length)
      setAgreementSection(false);
    } else if (activeGroup === 11 && questionGroups.length === 12) {
      setActiveGroup(12);
      setAgreementSection(true);
    } else {
      setActiveGroup(activeGroup + 1);
      // console.log(activeGroup, questionGroups.length)
      setAgreementSection(false);
    }
  };

  const handleInputFocus = (isFocused) => {
    setInputFocused(isFocused);
  };

  const handleValidationChange = (status) => {
    setActiveGroupComplete(status);
  };

  const handleDecidingQuestions = (from, continues) => {
    if (continues) {
      handleAnswers(from, continues.toString());
      setActiveGroup(activeGroup + 1);
      setValueDecideProfit(false);
      setValueDecideSdg(false);
    } else if (from === 0) {
      setValueDecideProfit(true);
    } else if (from === 1) {
      setValueDecideSdg(true);
    }
  };

  if (
    localStorage.currentUserJwt !== null &&
    props.authState.loggedIn === false
  ) {
    props.setAuthLoggedInTrue();
    return <div></div>;
  }
  if (questionGroups.length === 0) return <div>Loading...</div>;

  const handleBackBttnClick = () => {
    // setCurrentQuestionIndex(currentQuestionIndex - 1);
    setActiveGroup(activeGroup - 1);
    setAgreementSection(false);
  };

  // const questionIndexControl = (change) => {
  //   if (change === -1 ) {
  //     setCurrentQuestionIndex(currentQuestionIndex - 1)
  //   } else {
  //     setCurrentQuestionIndex(currentQuestionIndex + 1)
  //   }
  // }

  return (
    <div>
      <Container>
        <Overlay pose={inputFocused ? "isFocusing" : "default"} />
        <ProgressBar pose="visible" poseKey={progress} progress={progress} />

        {/* <SubmissionSideScreen
          agreementSection={agreementSection}
          title={activeGroup === questionGroups.length ? 'Almost done' : questionGroups[activeGroup].groupTitle}
          description={activeGroup === questionGroups.length ? 'Please download the Participants Agreement by pressing on the button. After reading it carefully, and if you agree with its terms and conditions, press I agree to finish your submission.' : questionGroups[activeGroup].groupDescription}
        /> */}
        <SubmissionSideScreen
          agreementSection={agreementSection}
          title={
            activeGroup === questionGroups.length
              ? ""
              : questionGroups[activeGroup].groupTitle
          }
          description={
            activeGroup === questionGroups.length
              ? ""
              : questionGroups[activeGroup].groupDescription
          }
        />
        <Right>
          <Content>
            <PoseGroup
              animateOnMount={false}
              withParent={true}
              preEnterPose="preEnter"
            >
              {
                <PGroupContainer
                  key={`container-${
                    activeGroup === questionGroups.length
                      ? "complete-submission"
                      : questionGroups[activeGroup].id.toString()
                  }`}
                >
                  {activeGroup === questionGroups.length ? (
                    <CompleteSubmission
                      groups={questionGroups}
                      answers={answers}
                      authState={props.authState}
                      login={props.login}
                    />
                  ) : (
                    <QuestionGroup
                      group={questionGroups[activeGroup]}
                      answersHandler={handleAnswers}
                      handleDecidingQuestions={handleDecidingQuestions}
                      handleInputFocus={handleInputFocus}
                      handleValidationChanges={handleValidationChange}
                      key={questionGroups[activeGroup].id.toString()}
                      answers={answers}
                      currentQuestionIndex={activeGroup}
                      placeholder={answers}
                    />
                  )}
                  {valueDecideProfit ? (
                    <div style={{ color: "red" }}>
                      {" "}
                      <br />
                      We are working very hard on building a non-profit version
                      of The Idealists as well. Unfortunately, until that is
                      ready, we cannot accept non-profit ideas yet.
                    </div>
                  ) : null}
                  {valueDecideSdg ? (
                    <div style={{ color: "red" }}>
                      {" "}
                      <br />
                      We are sorry, but you cannot continue if your idea does
                      not fit within one of the SDGs.
                    </div>
                  ) : null}
                </PGroupContainer>
              }
            </PoseGroup>
          </Content>
        </Right>
        <div
          css={css`
            position: absolute;
            right: 20px;
            bottom: 20px;
            width: 160px;
          `}
        >
          {!activeGroup !== questionGroups.length && (
            <Button
              text="Next"
              disabled={!activeGroupComplete}
              onClick={handleNextBttnClick}
              withIcon
            />
          )}
          {activeGroup !== 0 && (
            <Button text="Back" onClick={handleBackBttnClick} />
          )}
        </div>
      </Container>
    </div>
  );
};

const PProgressBar = posed.div({
  visible: {
    width: (props) => {
      return `${Math.floor(props.progress * 100)}vw`;
    },
    transition: {
      width: { type: "spring", stiffness: 1000, damping: 30 },
    },
  },
});

const PGroupContainer = posed.div({
  preEnter: {
    x: 400,
    originX: "50%",
    originY: "50%",
    opacity: 0,
    scale: 0.69,
    transition: {
      default: { ease: "easeInOut", duration: 400 },
    },
  },
  enter: {
    x: 0,
    originX: "50%",
    originY: "50%",
    opacity: 1.0,
    scale: 1.0,
    transition: {
      default: { ease: "easeInOut", duration: 400 },
    },
  },
  exit: {
    x: -400,
    originX: "50%",
    originY: "50%",
    opacity: 0,
    scale: 0.69,
    transition: { ease: "easeInOut", duration: 400 },
  },
});

const ProgressBar = styled(PProgressBar)`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 20px;
  border-radius: 5px;
  background-image: linear-gradient(to right, #1a3d7c, #ffffff);
  opacity: 0.6;
`;

const POverlay = posed.div({
  default: {
    backgroundImage:
      "linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1)",
    transition: {
      ease: "easeInOut",
      duration: 120,
    },
  },
  isFocusing: {
    backgroundImage:
      "linear-gradient(to right top, #142f60, #043864, #004067, #004869, #084f69)",
    transition: {
      ease: "easeInOut",
      duration: 120,
    },
  },
});

const Overlay = styled(POverlay)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
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
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";
`;

export default Submission;

// const answers = () => {
//   const formValuesObject = {
//     0: "",
//     1: "",
//     2: "",
//     3: "",
//     4: "",
//     5: "",
//     6: "",
//     7: "",
//     8: "",
//     9: "",
//     10: "",
//     11: "",
//   };
//   const mapValuesToObject = (key, value) =>
//     formValuesObject.map((element) => (element[key] = value));
//   mapValuesToObject();
// };
