/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Button from '../Questions/Button';
import posed from 'react-pose';
import logo from '../../res/logo_horizontal_white.png';

import countryList from './country-list';
import Select from '../Questions/Select';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#1A3D7C' : '#1A3D7C',
  }),
  // dropdownIndicator: (provided, state) => ({
  //   ...provided,
  //   height: '36px',
  // }),
  input: (provided, state) => ({
    ...provided,
    height: '32px',
  }),
  container: (provided, state) => ({
    ...provided,
    width: '100%',
    border: '0',
    lineHeight: '36px',
    borderRadius: '6px',
    height: '36px',
    textSize: '14px',
    padding: '0 5px',
    margin: '0',
    position: 'relative',
  }),
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    height: '36px',
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

const IdeaSubmissionLandingPage = () => {
  
  const [uiState, setUiState] = useState('notDisplayingLogin');
  const [emailAddress, setEmailAddress] = useState('');
  const [loginButtonEnabled, setLoginButtonEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [signUpFormValidated, setSignUpFormValidated] = useState(false);
  
  const openLogin = () => {
    setUiState('displayingLogin');
  };
  
  useEffect(() => {
    if (emailAddress.length > 6 && password.length > 6) {
      setLoginButtonEnabled(true);
      setSignUpFormValidated(true);
    }
  }, [emailAddress, password]);
  
  const handleEmailChange = (val) => {
    setEmailAddress(val.target.value);
  };
  
  const handlePasswordChange = (val) => {
    setPassword(val.target.value);
  };
  
  const validationSuccess = () => {
    return true;
  };
  
  return (
    <Container>
      <Global styles={css`
        body {
          align-items: center;
          justify-content: center;
          //top: 0;
          //left: 0;
          //width: 100%;
          //height: 100%;
          background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
          display: flex;
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
                <Button text={'Submit an idea'} onClick={openLogin} />
                <Button text={'Check my submissions'} />
              </Controls>
            </StartContent>
            <SignUpFormContainer pose={uiState} css={css`justify-self: flex-end; width: 100%;`}>
              <form>
                <SignUpForm>
                  
                  <FlexRow>
                    <FlexColumn>
                      <div css={css`font-size: 14px; `}>
                        We use your e-mail only for sending important notifications about your submission and your
                        account.
                      </div>
                    </FlexColumn>
                  </FlexRow>
                  
                  <FlexRow>
                    <FlexColumn>
                      <FormGroup>
                        <label>Name</label>
                        <input type='email' name='email' />
                      </FormGroup>
                    </FlexColumn>
                    <FlexColumn>
                      <FormGroup>
                        <label>Surname</label>
                        <input type='email' name='email' />
                      </FormGroup>
                    </FlexColumn>
                  </FlexRow>
                  
                  <FlexRow>
                    <FlexColumn>
                      <FormGroup>
                        <label>Email</label>
                        <input type='email' onChange={handleEmailChange} name='email' />
                      </FormGroup>
                    </FlexColumn>
                  </FlexRow>
                  
                  <FlexRow>
                    <FlexColumn>
                      <FormGroup>
                        <label>Password</label>
                        <input type='password' onChange={handlePasswordChange} name='password' />
                      </FormGroup>
                    </FlexColumn>
                  </FlexRow>
                  
                  <FlexRow>
                    <FlexColumn>
                      <FormGroup>
                        <label>Repeat password</label>
                        <input type='password' name='password' />
                      </FormGroup>
                    </FlexColumn>
                  </FlexRow>
                  
                  <FlexRow>
                    <FlexColumn>
                      <FormGroup>
                        <label>Repeat password</label>
                        <Select />
                      </FormGroup>
                    </FlexColumn>
                  </FlexRow>
                
                </SignUpForm>
              </form>
              <div css={css`float: right; width: 50%;`}>
                <Button disabled={!signUpFormValidated} text='Start my submission' disabledText='Sign up' withIcon />
              </div>
            </SignUpFormContainer>
          </div>
        </div>
      </Content>
    </Container>
  );
};

const FlexRow = styled.div`
  display: flex;
`;

const FlexColumn = styled.div`
  display: flex;
  flex: 1;
`;

const FormGroup = styled.div`
  width: 100%;
  padding: 5px 10px;
`;

const PStartContent = posed.div({
  notDisplayingLogin: {
    y: 0,
    opacity: 1.0,
  },
  displayingLogin: {
    y: -500,
    opacity: 0.3,
  },
});

const PSecondaryContent = posed.div({
  notDisplayingLogin: {
    y: 0,
    opacity: 0,
  },
  displayingLogin: {
    y: -500,
    opacity: 1.0,
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

const SignUpFormContainer = styled(PSecondaryContent)`
  width: auto;
  height: auto;
  color: #233949;
`;

const SignUpForm = styled.div`
  width: auto;
  height: auto;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 2px 2px 23px 0 rgba(37,37,37,0.39);
  background-color: rgba(255, 255, 255, 0.9);
  color: #233949;
  margin-bottom: 26px;
  display: flex;
  flex-direction: column;
  
  label {
    display: block;
    height: 30px;
    width: 100%;
    line-height: 30px;
    font-size: 12px;
    color: #233949;
    padding: 0;
    margin: 0;
    border-radius: 10px;
    border-color: transparent;
    outline: none;
    -webkit-appearance: none;
  }
  
  input {
    display: block;
    height: 36px;
    width: 100%;
    line-height: 36px;
    font-size: 14px;
    color: #233949;
    border-radius: 6px;
    border-color: transparent;
    padding: 0 5px;
    margin: 0;
    outline: none;
    -webkit-appearance: none;
  }
`;

export default IdeaSubmissionLandingPage;
