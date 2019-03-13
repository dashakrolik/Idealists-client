/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Button from '../Questions/Button';
import posed from 'react-pose';
import logo from '../../res/logo_horizontal_white.png';
import Select from 'react-select';

import countryList from './country-list';
import Registration from './Registration';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#1A3D7C' : '#1A3D7C',
  }),
  input: (provided, state) => ({
    ...provided,
    height: '32px',
  }),
  container: (provided, state) => ({
    ...provided,
    lineHeight: '36px',
    borderRadius: '6px',
    height: '36px',
    textSize: '14px',
  }),
  control: (base, state) => ({
    ...base,
    height: '36px',
    '&:hover': {
      border: state.isFocused ? 0 : 0,
    },
  }),
};

const IdeaSubmissionLandingPage = () => {
  
  const [uiState, setUiState] = useState('notDisplayingLogin');
  const [emailAddress, setEmailAddress] = useState('');
  const [loginButtonEnabled, setLoginButtonEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [signUpFormValidated, setSignUpFormValidated] = useState(false);
  
  const [registrationFormData, setRegistratinoFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    passwordRepeat: '',
    countryOfResidence: '',
  });
  
  const openRegistration = () => {
    setUiState('displayingLogin');
  };
  
  const closeRegistration = () => {
    setUiState('notDisplayingLogin');
  };
  
  useEffect(() => {
    if (emailAddress.length > 6 && password.length > 6) {
      setLoginButtonEnabled(true);
      setSignUpFormValidated(true);
    }
  }, [emailAddress, password]);
  
  return (
    <Container>
      <Global styles={css`
        body {
          background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
        }
      `} />
      <Content>
        <div css={css`grid-area: logo-area;`}>
          <Logo src={logo} alt='Logo' />
        </div>
        <div css={css`grid-area: content-area`}>
          <div css={css`display: flex; align-items: center; flex-direction: column;`}>
            <StartContent pose={uiState}
                          css={css`display: flex; flex-direction: column; width: auto; margin-bottom: 60px;`}>
              <Heading css={css`@media only screen and (orientation:portrait) { margin-top: 60px;}`}>Idea
                Portal
              </Heading>
              <Paragraph>
                The Idea Portal is a place where you can submit your ideas and track progress of already submitted
                ones.
              </Paragraph>
              <Paragraph>
                We require registration in order to make the whole submission process easier. You can easily track the
                progress of your submission and we can easily contact you if we need additional information.
              </Paragraph>
              <Controls css={css`display: flex; flex-wrap: wrap; justify-content: flex-start;`}>
                <Button text={'Submit an idea'} onClick={openRegistration} />
                <Button text={'Check my submissions'} />
              </Controls>
            </StartContent>
            <Registration show={uiState === 'displayingLogin'} handleCancel={closeRegistration} />
          </div>
        </div>
      </Content>
    </Container>
  );
};

const PStartContent = posed.div({
  notDisplayingLogin: {
    y: 0,
    opacity: 1.0,
  },
  displayingLogin: {
    y: -390,
    opacity: 0.15,
  },
});

const StartContent = styled(PStartContent)`
  width: 100%;
`;

const Logo = styled.img`
  height: 70px;
  align-self: flex-start;
  margin-right: 60px;
`;

const Controls = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  align-self: center;
  justify-self: center;
  color: #ffffff;
  width: 80vw;
  max-width: 900px;
  height: auto;
  max-height: 500px;
  padding: 20px;
  display: grid;
  
  @media only screen and (orientation:portrait) { 
    grid-template-columns: 1fr;
    grid-template-rows:  auto auto;
    grid-template-areas: "logo-area" "content-area";
  }
  @media only screen and (orientation:landscape) { 
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    grid-template-areas: "logo-area content-area";
  }
`;

const Heading = styled.div`
  font-size: 30px;
  font-weight: 800;
  margin: 18px 10px 80px 10px;
`;

const Paragraph = styled.div`
  display: block;
  position: relative;
  font-size: 14px;
  font-weight: 400;
  margin: 0 10px 30px;
`;

const Container = styled.div`
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
  display: flex;
`;

export default IdeaSubmissionLandingPage;
