/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import SingleLineQuestion from "./SingleLineQuestion";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import Button from "./Button";
import posed from "react-pose";

const QuestionGroup = (props) => {
  const [validations, setValidations] = useState([]);
  // const [answers, setAnswers] = useState([]);
  // console.log(props.answers, 'question group');
  const { currentQuestionIndex, answers, placeholder } = props;
  // console.log(currentQuestionIndex, 'question group question index')
  // console.log(placeholder, 'placeholder')
  useEffect(() => {
    if (validations.length === 0) return;
    if (
      Object.keys(validations).reduce((acc, currVal) => {
        return acc && validations[currVal];
      }, true)
    ) {
      props.handleValidationChanges(true);
    } else {
      props.handleValidationChanges(false);
    }
  }, [validations]);

  // useEffect(()=> {

  //   console.log("answers in questionGroup.js", props.answers)
  // }, [])

  const handleDecidingQuestions = (from, answer) => {
    props.handleDecidingQuestions(from, answer);
  };

  const handleInputFocus = (isFocused) => {
    props.handleInputFocus(isFocused);
  };

  const handleValueChanges = (from, newValue) => {
    console.log("QuestionGroup from newValue", from, newValue);
    props.answersHandler(from, newValue);
  };

  return (
    <GroupContainer>
      {props.group.questions.map((question) => {
        if (question.type === "deciding")
          return (
            <FlexRow>
              <FlexColumn>
                <FormGroup
                  css={css`
                    text-align: center;
                  `}
                >
                  <div
                    css={css`
                      font-size: 24px;
                    `}
                  >
                    {question.text}
                  </div>
                  <FlexRow>
                    <FlexColumn
                      css={css`
                        justify-content: center;
                        margin-top: 30px;
                      `}
                    >
                      <Button
                        text={question.endOption}
                        disabled={false}
                        onClick={() =>
                          handleDecidingQuestions(question.id, false)
                        }
                      />
                      <Button
                        text={question.continueOption}
                        disabled={false}
                        onClick={() =>
                          handleDecidingQuestions(question.id, true)
                        }
                      />
                    </FlexColumn>
                  </FlexRow>
                </FormGroup>
              </FlexColumn>
            </FlexRow>
          );
        return (
          <FlexRow>
            <FlexColumn>
              <FormGroup>
                {question.type === "singleLine" && (
                  <SingleLineQuestion
                    questionTitle={question.text}
                    errorMessage={question.validationErrorMsg}
                    maxChar={question.maxChar}
                    onChange={handleValueChanges}
                    onFocusChanged={handleInputFocus}
                    groupId={props.group.id}
                    id={question.id.toString()}
                    onValidationChange={props.handleValidationChanges}
                    // placeholder={""}
                    // answers={answers}
                    currentQuestionIndex={currentQuestionIndex}
                    value={answers}
                    placeholder={
                      placeholder.length > 0
                        ? placeholder.currentQuestionIndex
                        : "nina"
                    }
                  />
                )}
                {question.type === "multiLine" && (
                  <SingleLineQuestion
                    questionTitle={question.text}
                    errorMessage={question.validationErrorMsg}
                    maxChar={question.maxChar}
                    onChange={handleValueChanges}
                    onFocusChanged={handleInputFocus}
                    id={question.id.toString()}
                    onValidationChange={props.handleValidationChanges}
                    multiLine
                    // value={answers}
                    // placeholder={""}
                    value={answers}
                    // answers={answers}
                    currentQuestionIndex={currentQuestionIndex}
                    placeholder={placeholder.length > 0 ? answers : placeholder}
                  />
                )}
                {question.type === "singleChoice" && (
                  <SingleChoiceQuestion
                    questionTitle={question.text}
                    options={question.options}
                    errorMessage={question.validationErrorMsg}
                    maxChar={question.maxChar}
                    onChange={handleValueChanges}
                    onFocusChanged={handleInputFocus}
                    onValidationChange={props.handleValidationChanges}
                    id={question.id.toString()}
                    // value={props.answers}
                    // placeholder={""}
                  />
                )}
                {question.type === "multiChoice" && (
                  <SingleChoiceQuestion
                    // questionTitle={question.text}
                    options={question.options}
                    errorMessage={question.validationErrorMsg}
                    maxChar={question.maxChar}
                    onChange={handleValueChanges}
                    onFocusChanged={handleInputFocus}
                    onValidationChange={props.handleValidationChanges}
                    id={question.id.toString()}
                    value={answers}
                    currentQuestionIndex={currentQuestionIndex}
                    placeholder={placeholder.length > 0 ? answers : placeholder}
                    multiChoice
                    // value={props.answers}
                    // placeholder={""}
                  />
                )}
              </FormGroup>
            </FlexColumn>
          </FlexRow>
        );
      })}
    </GroupContainer>
  );
};

const FlexRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  @media only screen and (orientation: portrait) {
    flex-direction: column;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex: 1;
`;

const FormGroup = styled.div`
  padding: 5px 10px;
  flex: 1;
`;

// const FormControls = styled.div`
//   position: relative;
//   justify-content: center;
//   width: 90%;
//   height: 50px;
//   line-height: 50px;
//   display: flex;
//   flex-direction: row;
// `;

// const GroupTitle = styled.div`
//   font-size: 30px;
//   font-weight: 800;
//   text-align: left;
//   color: #ffffff;
//   position:relative;
//   padding: 5px 15px;
//   flex: 1;
//   margin-bottom: 16px;
// `;

// const GroupSubtitle = styled.div`
//   font-size: 12px;
//   font-weight: 400;
//   text-align: left;
//   color: #ffffff;
//   position:relative;
//   padding: 5px 15px;
//   flex: 1;
//   margin-bottom: 32px;
// `;

const PGroupContainer = posed.div({
  preEnter: {
    x: 600,
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
    x: -600,
    originX: "50%",
    originY: "50%",
    opacity: 0,
    scale: 0.69,
    transition: { ease: "easeInOut", duration: 400 },
  },
});

const GroupContainer = styled(PGroupContainer)`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  flex-grow: 1;
`;

// const countryList = [
//   { label: "Afghanistan", value: "AF" },
//   { label: "Aland Islands", value: "AX" },
// ];

export default QuestionGroup;
