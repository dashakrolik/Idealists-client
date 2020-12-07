/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Button from '../reogranisation/Questions/Button';
import posed from 'react-pose';
import { useState } from 'react'
import CofounderRegisteration from './CofounderRegisteration'


const CofounderStart = (props) => {
    const [uiState, setUiState] = useState('notDisplayingLogin');


    const existingUser = () => {
        props.history.push('/Cofounder/login');
    };
    const newUser = () => {
        if (props.authState.loggedIn) {
            props.history.push('/Cofounder');
        } else {
            setUiState('displayingLogin');
        }
    };
    const closeRegistration = () => {
        setUiState('notDisplayingLogin');
    };

    return (
        <Container>
            <Global styles={css`
            body {
            background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
            }
        `} />
            <Content>
                <div css={css`grid-area: content-area`}>
                    <div css={css`display: flex; align-items: center; flex-direction: column;`}>
                        <StartContent pose={uiState}
                            css={css`display: flex; flex-direction: column; width: auto; margin-bottom: 60px;`}>
                            <Heading css={css`@media only screen and (orientation:portrait) { margin-top: 60px;}`}>
                                My co-founder page
                        </Heading>
                            <Paragraph>
                                Welcome to your co-founder Page. Below you can login.
                        </Paragraph>
                            <Paragraph>
                                If you don’t have an account yet, create your account below.
                        </Paragraph>
                            <Controls css={css`display: flex; flex-wrap: wrap; justify-content: flex-start;`}>
                                <Button text={'Existing User'} onClick={existingUser} />
                                <Button text={'New User'} onClick={newUser} />
                            </Controls>
                        </StartContent>
                        <CofounderRegisteration show={uiState === 'displayingLogin'} handleCancel={closeRegistration} props={props} />
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
  overflow-y:scroll;
`;

export default CofounderStart;
