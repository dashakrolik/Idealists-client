import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import posed from "react-pose";
import Select from "react-select";
import makeAnimated from "react-select/lib/animated";
// import jsonFormData from '../../MyIdea/IdeaSubmission/idea-form-v1'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#1A3D7C" : "#1A3D7C",
  }),
  container: (provided, state) => ({
    ...provided,
    minHeight: "40px",
    border: "0",
    lineHeight: "26px",
    borderRadius: "6px",
    textSize: "16px",
  }),
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    borderRadius: "6px",
    minHeight: "100%",
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      border: state.isFocused ? 0 : 0,
    },
  }),
};

const SingleChoiceQuestion = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  // const [isStillInit, setIsStillInit] = useState(true);
  const [validated, setValidated] = useState(false);
  const [currentValue, setCurrentValue] = useState([]);
  // const [currentValue2, setCurrentValue2] = useState([]);
  useEffect(() => {
    if (!!props.multiChoice) {
      if (currentValue.length >= 1) {
        setValidated(true);
      } else {
        setValidated(false);
      }
    } else {
      if (currentValue.value) {
        setValidated(true);
      } else {
        setValidated(false);
      }
    }
    if (props.onChange) {
      props.onChange(props.id, currentValue);
    }
  }, [currentValue]);

  useEffect(() => {
    props.onValidationChange && props.onValidationChange(props.id, validated);
  }, [validated]);

  const handleChange = (selectedOption) => {
    setCurrentValue(selectedOption);
  };

  const handleFocus = () => {
    setIsFocused(true);
    props.onFocusChanged && props.onFocusChanged(true);
  };

  const handleLostFocus = () => {
    setIsFocused(false);
    props.onFocusChanged && props.onFocusChanged(false);
  };

  return (
    <Container pose={isFocused ? "focused" : "default"}>
      <QuestionTitle>{props.questionTitle}</QuestionTitle>
      <Select
        closeMenuOnSelect={!props.multiChoice}
        components={props.multiChoice ? makeAnimated() : undefined}
        isMulti={!!props.multiChoice}
        styles={customStyles}
        value={currentValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleLostFocus}
        options={props.options}
        menuPortalTarget={document.body}
      />
    </Container>
  );
};

SingleChoiceQuestion.propTypes = {
  options: PropTypes.array.isRequired,
  questionTitle: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  onChange: PropTypes.func,
};

const QuestionTitle = styled.p`
  display: block;
  padding: 5px 5px 5px 0;
  margin: 0;
  font-size: 14px;
  width: auto;
  ul {
    list-style: none;
  }
`;

// const poses = {
//   tfDefault: {
//     backgroundColor: 'rgba(255, 255, 255, 1.0)',
//     color: '#252525',
//     scale: 1.0,
//     transition: { ease: 'easeInOut', duration: 200 },
//   },
//   tfFocused: {
//     backgroundColor: 'rgba(255, 255, 255, 1.0)',
//     color: '#252525',
//     scale: 1.0,
//     transition: { ease: 'easeInOut', duration: 120 },
//   },
//   tfError: {
//     backgroundColor: 'rgba(255, 115, 141, 1.0)',
//     color: '#ffffff',
//     scale: 1.0,
//     transition: { ease: 'easeInOut', duration: 200 },
//   },
//   tfFocusedError: {
//     backgroundColor: 'rgba(255, 115, 141, 1.0)',
//     color: '#ffffff',
//     scale: 1.0,
//     transition: { ease: 'easeInOut', duration: 200 },
//   },
// };

const PContainer = posed.div({
  default: {
    opacity: 0.69,
    scale: 1.0,
    transition: { ease: "easeInOut", duration: 120 },
  },
  focused: {
    opacity: 1.0,
    scale: 1.02,
    transition: { ease: "easeInOut", duration: 120 },
  },
});

// const PErrorMessage = posed.p({
//   hide: {
//     opacity: 0,
//     y: 10,
//     transition: { ease: "easeInOut", duration: 200 },
//   },
//   show: {
//     opacity: 0.69,
//     y: 0,
//     transition: { ease: "easeInOut", duration: 200 },
//   },
// });

// const ErrorMessage = styled(PErrorMessage)`
//   display: block;
//   padding: 5px 5px 5px 0;
//   margin: 0;
//   width: auto;
//   font-size: 12px;
// `;

const Container = styled(PContainer)`
  flex-grow: 1;
  position: relative;
  top: 0;
  left: 0;
  margin: 5px;
  width: auto;
  height: auto;
  color: #ffffff;
`;

export default SingleChoiceQuestion;
