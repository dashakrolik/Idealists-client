import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import posed from 'react-pose';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#1A3D7C' : '#1A3D7C',
  }),
  container: (provided, state) => ({
    ...provided,
    left: '5%',
    width: '90%',
    right: 'auto',
    height: '42px',
    border: '0',
    lineHeight: '26px',
    borderRadius: '6px',
    textSize: '16px',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    
    return { ...provided, opacity, transition };
  },
};

const SingleChoiceQuestion = (props) => {
  
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  
  const [isFocused, setIsFocused] = useState(false);
  const [isStillInit, setIsStillInit] = useState(true);
  const [validated, setValidated] = useState(true);
  const [currentValue, setCurrentValue] = useState('');
  
  useEffect(() => {
    if (props.validator) {
      setValidated(props.validator(currentValue));
    }
    if (props.onChange) {
      props.onChange(currentValue.value);
    }
  }, [currentValue]);
  
  const handleChange = (selectedOption) => {
    setCurrentValue(selectedOption);
    setIsStillInit(false);
  };
  
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleLostFocus = () => {
    setIsFocused(false);
  };
  
  return (
    <Container halfSize={props.halfSize} pose={isFocused ? 'focused' : 'default'}>
      <QuestionTitle>{props.questionTitle}</QuestionTitle>
      <Select
        styles={customStyles}
        components={makeAnimated}
        value={currentValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleLostFocus}
        options={props.options}
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

const DropDownContainer = styled.div`
  position: relative;
  top: 0;
  width: 90%;
  left: 5%;
  background-color: red;
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

const PTextField = posed.input({
  default: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    color: '#1A3D7C',
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 200 },
  },
  focused: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    scale: 1.02,
    transition: { ease: 'easeInOut', duration: 120 },
  },
  error: {
    backgroundColor: 'rgba(255, 115, 141, 0.9)',
    color: '#ffffff',
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 200 },
  },
  focusedError: {
    backgroundColor: 'rgba(255, 115, 141, 0.9)',
    color: '#ffffff',
    scale: 1.02,
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
  ul {
    list-style: none;
  }
`;

const ErrorMessage = styled(PErrorMessage)`
  position: relative;
  display: block;
  padding: 5px 5px 5px 0;
  margin: 0;
  left: 10%;
  width: 90%;
  font-size: 12px;
`;

const TextField = styled(PTextField)`
  position: relative;
  display: block;
  left: 5%;
  width: 90%;
  height: 26px;
  line-height: 30px;
  border-radius: 6px;
  border-color: transparent;
  padding: 6px;
  outline: none;
  -webkit-appearance: none;
`;

const Container = styled(PContainer)`
  position: relative;
  display: inline-block;
  top: 0;
  left: 0;
  margin-bottom: 20px;
  width: ${props => props.halfSize ? '45%' : '100%'};
  height: auto;
  color: white;
  vertical-align: top;
`;

export default SingleChoiceQuestion;