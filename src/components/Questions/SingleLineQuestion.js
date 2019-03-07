import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import posed from 'react-pose';

const SingleLineQuestion = (props) => {
  
  const [isFocused, setIsFocused] = useState(false);
  const [isStillInit, setIsStillInit] = useState(true);
  const [validated, setValidated] = useState(true);
  const [currentValue, setCurrentValue] = useState('');
  
  useEffect(() => {
    if (props.validator) {
      setValidated(props.validator(currentValue));
    }
    if (props.onChange) {
      props.onChange(currentValue);
    }
  }, [currentValue]);
  
  const handleChange = (e) => {
    setCurrentValue(e.target.value);
    setIsStillInit(false);
  };
  
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleLostFocus = () => {
    setIsFocused(false);
  };
  
  return (
    <Container isHalfSize={props.halfSize} pose={isFocused ? 'focused' : 'default'}>
      <QuestionTitle>{props.questionTitle}</QuestionTitle>
      <TextField onChange={handleChange} value={currentValue}
                 pose={(isStillInit || validated) ? (isFocused ? 'focused' : 'default') : (isFocused ? 'focusedError' : 'error')}
                 onFocus={handleFocus} onBlur={handleLostFocus}
      />
      <ErrorMessage
        pose={(!isStillInit && props.validator && !validated) ? 'show' : 'hide'}>{props.errorMessage || 'Validation error'}</ErrorMessage>
    </Container>
  );
};

SingleLineQuestion.propTypes = {
  questionTitle: PropTypes.string.isRequired,
  halfSize: PropTypes.bool,
  validator: PropTypes.func,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

const PTextField = posed.input({
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
    opacity: 1,
    y: 0,
    transition: { ease: 'easeInOut', duration: 200 },
  },
});

const QuestionTitle = styled.p`
  position: relative;
  display: block;
  padding: 5px 5px 5px 0;
  margin: 0;
  left: 5%;
  width: 90%;
`;

const ErrorMessage = styled(PErrorMessage)`
  position: relative;
  display: block;
  padding: 5px 5px 5px 0;
  margin: 0;
  left: 5%;
  width: 90%;
  font-size: 12px;
`;

const TextField = styled(PTextField)`
  position: relative;
  box-sizing:border-box;
  display: block;
  left: 5%;
  width: 90%;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  border-radius: 6px;
  border-color: transparent;
  padding: 6px;
  outline: none;
  -webkit-appearance: none;
`;

const PContainer = posed.div({
  default: {
    opacity: 0.6,
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 120 },
  },
  focused: {
    opacity: 0.9,
    scale: 1.02,
    transition: { ease: 'easeInOut', duration: 120 },
  },
});

const Container = styled(PContainer)`
  position: relative;
  display: inline-block;
  top: 0;
  left: 0;
  margin-bottom: 20px;
  width: 100%;
  height: auto;
  color: #ffffff;
  vertical-align: top;
`;

export default SingleLineQuestion;