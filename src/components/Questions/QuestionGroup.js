/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import SingleLineQuestion from './SingleLineQuestion';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import jsonFormData from './idea-form-v1';
import TagSelect from './TagSelect';


const QuestionGroup = (props) => {
  
  const [progress, setProgress] = useState(0);
  const [inputFocused, setInputFocused] = useState(0);
  
  const handleInputFocus = (isFocused) => {
    props.handleInputFocus(isFocused);
    setInputFocused(isFocused);
  };
  
  const handleValidationChanges = (from, status) => {
    console.log(`El ${from} just got ${status ? 'validated' : 'invalidated'}`);
  };
  
  const handleValueChanges = (from, newValue) => {
    console.log(`El ${from} just got a new value ${newValue}`);
  };
  
  return (
    <GroupContainer>
      {
        props.group.questions.map(row => {
          return <FlexRow>
            {
              row.map(question => {
                return <FlexColumn><FormGroup>
                  {(question.type === 'singleLine')
                  && <SingleLineQuestion questionTitle={question.text}
                                         errorMessage={question.error}
                                         validationRegex={question.validationRegex}
                                         onChange={handleValueChanges}
                                         onFocusChanged={handleInputFocus}
                                         id='1'
                                         onValidationChange={handleValidationChanges}
                  />}
                  {(question.type === 'multiLine')
                  && <SingleLineQuestion questionTitle={question.text}
                                         errorMessage={question.error}
                                         validationRegex={question.validationRegex}
                                         onChange={handleValueChanges}
                                         onFocusChanged={handleInputFocus}
                                         id='1'
                                         onValidationChange={handleValidationChanges}
                                         multiLine
                  />}
                  {(question.type === 'singleChoice')
                  && <SingleChoiceQuestion questionTitle={question.text}
                                           options={question.options}
                                           onChange={handleValueChanges}
                                           onFocusChanged={handleInputFocus}
                                           id='1'
                  />}
                  {(question.type === 'multiChoice')
                  && <SingleChoiceQuestion questionTitle={question.text}
                                           options={question.options}
                                           onChange={handleValueChanges}
                                           onFocusChanged={handleInputFocus}
                                           id='1'
                                           multiChoice
                  />}
                </FormGroup></FlexColumn>;
              })
            }
          </FlexRow>;
        })
      }
    </GroupContainer>
  );
};

const FlexRow = styled.div`
  display: flex;
  align-items: flex-start;
  @media only screen and (orientation:portrait) { 
    flex-direction: column;
}
`;

const FlexColumn = styled.div`
  display: flex;
  flex: 1;
`;

const FormGroup = styled.div`
  width: 100%;
  padding: 5px 10px;
`;


const FormControls = styled.div`
  position: relative;
  justify-content: center;
  width: 90%;
  height: 50px;
  line-height: 50px;
  display: flex;
  flex-direction: row;
`;

const GroupContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  flex-grow: 1;
`;

const countryList = [
  { label: "Afghanistan", value: "AF" },
  { label: "Aland Islands", value: "AX" },
];

export default QuestionGroup;
