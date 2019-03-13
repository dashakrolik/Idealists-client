import React, { useEffect, useState } from 'react';
import QuestionGroup from './QuestionGroup';
import styled from '@emotion/styled';
import posed, { PoseGroup } from 'react-pose';
import logo from '../../res/logo_horizontal_white.png';
import { css, Global, jsx } from '@emotion/core';

import jsonFormData from './idea-form-v1';

const FormScreen = () => {
  
  const oneGroup = jsonFormData.groups[2];
  
  const [progress, setProgress] = useState(0);
  const [inputFocused, setInputFocused] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);
  
  const handleInputFocus = (isFocused) => {
    setInputFocused(isFocused);
  };
  
  
  // jsonFormData.groups[0].questions.map(row => {
  //   return <FlexRow>
  //     {
  //       row.map(question => {
  //         return <FlexColumn><FormGroup>
  //           {(question.type === 'singleLine')
  //           && <SingleLineQuestion questionTitle={question.text}
  //                                  errorMessage={question.error}
  //                                  validationRegex={question.validationRegex}
  //                                  onChange={handleValueChanges}
  //                                  onFocusChanged={handleInputFocus}
  //                                  id='1'
  //                                  onValidationChange={handleValidationChanges}
  //           />}
  //           {(question.type === 'multiLine')
  //           && <SingleLineQuestion questionTitle={question.text}
  //                                  errorMessage={question.error}
  //                                  validationRegex={question.validationRegex}
  //                                  onChange={handleValueChanges}
  //                                  onFocusChanged={handleInputFocus}
  //                                  id='1'
  //                                  onValidationChange={handleValidationChanges}
  //                                  multiLine
  //           />}
  //           {(question.type === 'singleChoice')
  //           && <SingleChoiceQuestion questionTitle={question.text}
  //                                    options={question.options}
  //                                    onChange={handleValueChanges}
  //                                    onFocusChanged={handleInputFocus}
  //                                    id='1'
  //           />}
  //           {(question.type === 'multiChoice')
  //           && <SingleChoiceQuestion questionTitle={question.text}
  //                                    options={question.options}
  //                                    onChange={handleValueChanges}
  //                                    onFocusChanged={handleInputFocus}
  //                                    id='1'
  //                                    multiChoice
  //           />}
  //         </FormGroup></FlexColumn>;
  //       })
  //     }
  //   </FlexRow>;
  // });
  
  const renderGroup = (progress) => {
    return (
      <QuestionGroup key='asdf' handleInputFocus={handleInputFocus} group={oneGroup} />
    );
  };
  
  return (
    <Container>
      <Global styles={css`
        body {
          background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
        }
      `} />
      <Overlay pose={inputFocused ? 'isFocusing' : 'default'} />
      <Logo src={logo} alt='Logo' />
      <ProgressBar pose='visible' poseKey={progress.toString()} progress={progress} />
      <ProgressInfo pose='visible' poseKey={progress.toString()} progress={progress}>
        <p>current progress</p>
        {`${Math.floor(progress * 100)}%`}
      </ProgressInfo>
      <Content>
        <PoseGroup animateOnMount={false} withParent={true} preEnterPose='preEnter'>
          {renderGroup(progress)}
        </PoseGroup>
      </Content>
    </Container>
  );
};

const FlexRow = styled.div`
  display: flex;
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


const PProgressBar = posed.div({
  visible: {
    width: (props) => {
      return (`${10 + Math.floor(props.progress * 90)}vw`);
    },
    transition: {
      width: { type: 'spring', stiffness: 1000, damping: 30 },
    },
  },
});

const PGroupContainer = posed.div({
  preEnter: {
    x: 600,
    originX: '50%',
    originY: '50%',
    opacity: 0,
    scale: 0.69,
    // delay: 400,
    transition: {
      default: { ease: 'easeInOut', duration: 400 },
    },
  },
  enter: {
    x: 0,
    originX: '50%',
    originY: '50%',
    opacity: 1.0,
    scale: 1.0,
    // delay: 400,
    transition: {
      default: { ease: 'easeInOut', duration: 400 },
    },
  },
  exit: {
    x: -600,
    originX: '50%',
    originY: '50%',
    opacity: 0,
    scale: 0.69,
    // delay: 400,
    transition: { ease: 'easeInOut', duration: 400 },
  },
});

const GroupContainer = styled(PGroupContainer)`
  
`;

const ProgressInfo = styled(PProgressBar)`
  position: fixed;
  height: 28px;
  bottom: 6px;
  left: 0;
  text-align: right;
  line-height: 28px;
  font-size: 22px;
  color: #ffffff;
  opacity: 0.6;
  p {
    display: inline;
    padding: 0;
    margin: 0 5px 0 0;
    line-height: 12px;
    font-size: 10px;
  }
`;

const ProgressBar = styled(PProgressBar)`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 6px;
  background-color: #ffffff;
  opacity: 0.6;
`;

const POverlay = posed.div({
  default: {
    backgroundImage: 'linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1)',
    transition: {
      ease: 'easeInOut',
      duration: 120,
    },
  },
  isFocusing: {
    backgroundImage: 'linear-gradient(to right top, #142f60, #043864, #004067, #004869, #084f69)',
    transition: {
      ease: 'easeInOut',
      duration: 120,
    },
  },
});

const Logo = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  top: 30px;
  margin: 0 auto;
  height: 70px;
`;

const Overlay = styled(POverlay)`
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const Content = styled.div`
  align-self: center;
  justify-self: center;
  color: #ffffff;
  width: 80vw;
  max-width: 900px;
  height: auto;
  padding: 20px;
  
  //@media only screen and (orientation:portrait) { 
  //  grid-template-columns: 1fr;
  //  grid-template-rows:  auto auto;
  //  grid-template-areas: "logo-area" "content-area";
  //}
  //@media only screen and (orientation:landscape) { 
  //  grid-template-columns: auto auto;
  //  grid-template-rows: auto;
  //  grid-template-areas: "logo-area content-area";
  //}
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default FormScreen;