import React, { useEffect, useState } from 'react';
import QuestionGroup from './QuestionGroup';
import styled from '@emotion/styled';
import posed, { PoseGroup } from 'react-pose';
import logo from '../../res/logo_horizontal_white.png';

const FormScreen = () => {
  
  const [progress, setProgress] = useState(0);
  const [inputFocused, setInputFocused] = useState(0);
  
  const clickme = () => {
    setProgress(progress + 0.2);
  };
  
  const handleInputFocus = (isFocused) => {
    setInputFocused(isFocused);
  };
  
  const renderGroup = (progress) => {
    return (
      <PGroupContainer key={`group-${(progress * 10).toString()}`}>
        <QuestionGroup handleInputFocus={handleInputFocus} />
      </PGroupContainer>
    );
  };
  
  return (
    <Container pose={inputFocused ? 'isFocusing' : 'default'}>
      <Logo src={logo} alt='Logo' />
      <button onClick={clickme}>Clickme</button>
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

// const GroupContainer = styled.

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

const Content = styled.div`
  position: relative;
  width: 900px;
  height: auto;
  top: 50%;
  left: 50%;
  //right: 0;
  transform: translateY(-50%) translateX(-50%);
`;

const PContainer = posed.div({
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

const Container = styled(PContainer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
`;

export default FormScreen;