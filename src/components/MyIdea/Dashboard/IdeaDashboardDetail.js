import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { baseUrl } from '../../../constants';
import './IdeaDashboard.css'
/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Button from '../../reogranisation/Questions/Button';
import posed from 'react-pose';

export default function IdeaDashboardDetail(props) {
    const [user, setUserData] = useState({});
    const [userLoggedIn, setUserLoggedIn] = useState(true);
    const [userIdeas, setUserIdeas] = useState([]);
    const ideasId = props.match.params.id
    const [automatchResults, DoAutomatch] = useState([])
    useEffect(() => {
        request
            .get(`${baseUrl}/automatch/986`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .then(automatch => DoAutomatch(Object.values(automatch.body.autoMatch['automatch-results']['index-1'])))
    }, []);

    
    let smth = automatchResults.map(a => a.passage.text)
    console.log(smth)
    
    if (typeof automatchResults.autoMatch === 'object'){
        console.table(automatchResults.autoMatch['0'].relevance)
    }
	


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
              <StartContent 
                css={css`display: flex; flex-direction: column; width: auto; margin-bottom: 60px;`}>
                <Heading css={css`@media only screen and (orientation:portrait) { margin-top: 60px;}`}>
                  Idea Details
                </Heading>
                <Paragraph>
                  This page will show details for your idea
                </Paragraph>
                <Paragraph>
                  Please follow your next step: your market check
                </Paragraph>
                <Controls css={css`display: flex; flex-wrap: wrap; justify-content: flex-start;`}>
                  <Button text={'Start'} />
                </Controls>
              </StartContent>
            </div>
          </div>
        </Content>
      </Container>
    )
}


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
  