/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useEffect, useState, useContext } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import posed from "react-pose";

const SingleLineQuestion = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isStillInit, setIsStillInit] = useState(true);
  const [validated, setValidated] = useState(false);
  const [currentValue, setCurrentValue] = useState("");
  const { currentQuestionIndex, value, placeholder } = props;

  useEffect(() => {
    props.onValidationChange && props.onValidationChange(props.id, validated);
  }, [validated]);

  useEffect(() => {
    if (typeof value === "object") {
      setCurrentValue(value[currentQuestionIndex]);
    } else {
      setCurrentValue(value);
    }
  }, []);

  useEffect(() => {
    if (currentValue.length > 1 && currentValue.length < props.maxChar) {
      if (props.groupId === 5 && parseInt(props.id) === 0) {
        const replaceComma = currentValue.trim().replace(/,/g, " ");
        const removeSpaces = replaceComma.replace(/\s\s+/g, " ");
        const splitBySpace = removeSpaces.trim().split(" ");
        const numOfWords = splitBySpace.length;
        if (numOfWords <= 3) {
          setValidated(true);
        } else {
          setValidated(false);
        }
      } else {
        setValidated(true);
      }
    } else {
      setValidated(false);
    }
    if (props.onChange) {
      props.onChange(currentQuestionIndex, currentValue);
    }
  }, [currentValue]);

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  };
  const handleFocus = () => {
    setIsFocused(true);
    props.onFocusChanged && props.onFocusChanged(true);
  };

  const handleLostFocus = () => {
    setIsFocused(false);
    setIsStillInit(false);
    props.onFocusChanged && props.onFocusChanged(false);
  };

  return (
    <Container pose={isFocused ? "focused" : "default"}>
      <QuestionTitle>{props.questionTitle}</QuestionTitle>
      {!props.multiLine && (
        <TextField
          onChange={handleChange}
          value={currentValue}
          pose={
            isStillInit || validated
              ? isFocused
                ? "tfFocused"
                : "tfDefault"
              : isFocused
              ? "tfFocusedError"
              : "tfError"
          }
          onFocus={handleFocus}
          onBlur={handleLostFocus}
          placeholder={placeholder.length < 0 ? placeholder : ""}
        />
      )}

      {props.multiLine && (
        <TextArea
          onChange={handleChange}
          value={currentValue}
          pose={
            isStillInit || validated
              ? isFocused
                ? "tfFocused"
                : "tfDefault"
              : isFocused
              ? "tfFocusedError"
              : "tfError"
          }
          onFocus={handleFocus}
          onBlur={handleLostFocus}
          placeholder={placeholder.length > 0 ? placeholder : ""}
        />
      )}

      <ErrorMessage
        pose={
          !isStillInit && !!props.validationRegex && !validated
            ? "show"
            : "hide"
        }
      >
        {props.errorMessage || "Validation error"}
      </ErrorMessage>
    </Container>
  );
};

SingleLineQuestion.propTypes = {
  id: PropTypes.string.isRequired,
  questionTitle: PropTypes.string.isRequired,
  validationRegex: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  onValidationChange: PropTypes.func,
  onFocusChanged: PropTypes.func,
};

const poses = {
  tfDefault: {
    backgroundColor: "rgba(255, 255, 255, 1.0)",
    color: "#252525",
    scale: 1.0,
    transition: { ease: "easeInOut", duration: 200 },
  },
  tfFocused: {
    backgroundColor: "rgba(255, 255, 255, 1.0)",
    color: "#252525",
    scale: 1.0,
    transition: { ease: "easeInOut", duration: 120 },
  },
  tfError: {
    backgroundColor: "rgba(255, 115, 141, 1.0)",
    color: "#ffffff",
    scale: 1.0,
    transition: { ease: "easeInOut", duration: 200 },
  },
  tfFocusedError: {
    backgroundColor: "rgba(255, 115, 141, 1.0)",
    color: "#ffffff",
    scale: 1.0,
    transition: { ease: "easeInOut", duration: 200 },
  },
};

const PTextField = posed.input(poses);
const PTextArea = posed.textarea(poses);

const PErrorMessage = posed.p({
  hide: {
    opacity: 0,
    y: 10,
    transition: { ease: "easeInOut", duration: 200 },
  },
  show: {
    opacity: 0.69,
    y: 0,
    transition: { ease: "easeInOut", duration: 200 },
  },
});

const QuestionTitle = styled.p`
  display: block;
  padding: 5px 5px 5px 0;
  margin: 0;
  font-size: 14px;
  width: auto;
`;

const ErrorMessage = styled(PErrorMessage)`
  display: block;
  padding: 5px 5px 5px 0;
  margin: 0;
  width: auto;
  font-size: 12px;
`;

const TextField = styled(PTextField)`
  position: relative;
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  border-radius: 6px;
  border-color: transparent;
  padding: 6px;
  outline: none;
  color: #252525;
  -webkit-appearance: none;
`;

const TextArea = styled(PTextArea)`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 320px;
  line-height: 16px;
  font-size: 14px;
  border-radius: 6px;
  border-color: transparent;
  padding: 6px;
  outline: none;
  color: #252525;
  -webkit-appearance: none;
  resize: none;
`;

const PContainer = posed.div({
  default: {
    opacity: 0.69,
    y: 0,
    scale: 1.0,
    transition: { ease: "easeInOut", duration: 120 },
  },
  focused: {
    opacity: 1.0,
    y: 0,
    scale: 1.02,
    transition: { ease: "easeInOut", duration: 120 },
  },
});

const Container = styled(PContainer)`
  flex-grow: 1;
  //position: relative;
  //top: 0;
  //left: 0;
  margin: 5px;
  width: auto;
  height: auto;
  color: #ffffff;
`;

export default SingleLineQuestion;
