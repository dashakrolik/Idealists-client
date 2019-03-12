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
    height: '40px',
    border: '0',
    lineHeight: '26px',
    borderRadius: '6px',
    textSize: '16px',
    position: 'relative',
  }),
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    height: '100%',
    boxShadow: state.isFocused ? 0 : 0,
    '&:hover': {
      border: state.isFocused ? 0 : 0,
    },
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    
    return { ...provided, opacity, transition };
  },
};

const SingleChoiceQuestion = (props) => {
  
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

const PContainer = posed.div({
  default: {
    opacity: 0.60,
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 120 },
  },
  focused: {
    opacity: 1.0,
    scale: 1.02,
    transition: { ease: 'easeInOut', duration: 120 },
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

const Container = styled(PContainer)`
  position: relative;
  top: 0;
  left: 0;
  margin: 5px;
  width: ${props => props.halfSize ? '45%' : '100%'};
  height: auto;
  color: #233949;
  vertical-align: top;
`;

export default SingleChoiceQuestion;
