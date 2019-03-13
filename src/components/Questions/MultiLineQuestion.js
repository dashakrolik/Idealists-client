/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import posed from 'react-pose';

const MultiLineQuestion = (props) => {
  
  const [isFocused, setIsFocused] = useState(false);
  const [isStillInit, setIsStillInit] = useState(false);
  const [validated, setValidated] = useState(true);
  const [currentValue, setCurrentValue] = useState('');
  
  useEffect(() => {
    props.onValidationChange && props.onValidationChange(props.id, validated);
  }, [validated]);
  
  useEffect(() => {
    if (!!props.validationRegex) {
      const validator = new RegExp(props.validationRegex);
      setValidated(validator.test(currentValue));
    }
    if (props.onChange) {
      props.onChange(currentValue);
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
    <Container pose={isFocused ? 'focused' : 'default'}>
      <QuestionTitle>{props.questionTitle}</QuestionTitle>
      <TextArea onChange={handleChange} value={currentValue}
                pose={(isStillInit || validated) ? (isFocused ? 'tfFocused' : 'tfDefault') : (isFocused ? 'tfFocusedError' : 'tfError')}
                onFocus={handleFocus} onBlur={handleLostFocus}
      />
      <ErrorMessage pose={(!isStillInit && !!props.validationRegex && !validated) ? 'show' : 'hide'}>
        {props.errorMessage || 'Validation error'}
      </ErrorMessage>
    </Container>
  );
};

MultiLineQuestion.propTypes = {
  id: PropTypes.string.isRequired,
  questionTitle: PropTypes.string.isRequired,
  validationRegex: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  onValidationChange: PropTypes.func,
  onFocusChanged: PropTypes.func,
};

const PTextArea = posed.textarea({
  default: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    color: '#1A3D7C',
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 200 },
  },
  focused: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    color: '#1A3D7C',
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 120 },
  },
  error: {
    backgroundColor: 'rgba(255, 115, 141, 1.0)',
    color: '#ffffff',
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 200 },
  },
  focusedError: {
    backgroundColor: 'rgba(255, 115, 141, 1.0)',
    color: '#ffffff',
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 200 },
  },
});

const PErrorMessage = posed.p({
  hide: {
    opacity: 0,
    y: 10,
    transition: { ease: 'easeInOut', duration: 200 },
  },
  show: {
    opacity: 0.69,
    y: 0,
    transition: { ease: 'easeInOut', duration: 200 },
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

const TextArea = styled(PTextArea)`
  position: relative;
  box-sizing:border-box;
  display: block;
  width: 100%;
  //max-width: 600px;
  height: 320px;
  line-height: 16px;
  font-size: 16px;
  border-radius: 6px;
  border-color: transparent;
  padding: 6px;
  outline: none;
  -webkit-appearance: none;
`;

const PContainer = posed.div({
  default: {
    opacity: 0.69,
    y: 0,
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 120 },
  },
  focused: {
    opacity: 1.0,
    y: 0,
    scale: 1.02,
    transition: { ease: 'easeInOut', duration: 120 },
  },
});

const Container = styled(PContainer)`
  position: relative;
  top: 0;
  left: 0;
  margin: 5px;
  width: auto;
  height: auto;
  color: #ffffff;
`;

export default MultiLineQuestion;
