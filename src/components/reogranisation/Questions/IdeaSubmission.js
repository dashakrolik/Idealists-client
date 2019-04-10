import React, { Component } from 'react';
import jsonFormData from './idea-form-v1_old';
import FormScreen from './FormScreen';
import logo from '../../../res/logo_horizontal_white.png';
import { PoseGroup } from 'react-pose';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import posed from 'react-pose';
import Button from './Button';
import QuestionGroup from './QuestionGroup';

class IdeaSubmission extends Component {
  
  state = {
    questionGroups: [],
    currentGroup: -1,
    showOverlay: false,
  };
  
  componentDidMount() {
    const groups = jsonFormData.groups.map(group => {
      return {
        ...group,
        questions: Object.keys(group.questions).reduce((acc, currVal, i) => {
          return {
            ...acc,
            [currVal]: [...group.questions[currVal]],
          };
        }, {}),
      };
    });
    this.setState({ questionGroups: groups });
    this.setState({
      currentGroup: 0,
    });
  }
  
  
  render() {
    if (this.state.currentGroup < 0) return <div></div>;
    return (
      <Container>
        <Overlay pose={this.state.showOverlay ? 'isFocusing' : 'default'} />
        <Logo src={logo} alt='Logo' />
        {/*<ProgressBar pose='visible' poseKey={progress.toString()} progress={progress} />*/}
        <Left>
          <FlexRow><FlexColumn><GroupTitle>Test</GroupTitle></FlexColumn></FlexRow>
          <FlexRow><FlexColumn><GroupSubtitle>Test</GroupSubtitle></FlexColumn></FlexRow>
        </Left>
        <Right>
          <Content>
            <PoseGroup animateOnMount={false} withParent={true} preEnterPose='preEnter'>
              <QuestionGroup key={`question-group-${'123'}`} handleInputFocus={undefined}
                             handleDecidingQuestion={undefined} group={this.state.questionGroups[0]} />
            </PoseGroup>
          </Content>
        </Right>
        <div css={css`position: absolute; left: 20px; bottom: 20px; width: 160px;`}>
          <Button text='Previous' disabled={false} onClick={undefined} />
        </div>
        <div css={css`position: absolute; right: 20px; bottom: 20px; width: 160px;`}>
          <Button text='Next' disabled={true} onClick={undefined} />
        </div>
      </Container>
    );
  }
}


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
      return (`${Math.floor(props.progress * 90)}vw`);
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
  height: 20px;
  border-radius: 5px;
  background-image: linear-gradient(to right, #1a3d7c, #ffffff);
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
  left: 30px;
  //right: 0;
  top: 30px;
  margin: 0 auto;
  height: 70px;
`;

const Overlay = styled(POverlay)`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: -1;
`;

const Content = styled.div`
  align-self: center;
  justify-self: center;
  color: #ffffff;
  width: 90vw;
  max-width: 800px;
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

const GroupTitle = styled.div`
  font-size: 30px;
  font-weight: 800;
  text-align: left;
  color: #ffffff;
  position:relative;
  padding: 5px 15px;
  flex: 1;
  margin-bottom: 16px;
`;

const GroupSubtitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #ffffff;
  position:relative;
  padding: 5px 15px;
  flex: 1;
  margin-bottom: 32px;
`;

const Right = styled.div`
grid-area: right;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Left = styled.div`
grid-area: left;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 30px;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";
`;

export default IdeaSubmission;