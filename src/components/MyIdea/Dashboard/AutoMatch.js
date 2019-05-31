import React, { useEffect, useState, useContext } from 'react';
import request from 'superagent';
import { Redirect, Link } from 'react-router-dom';
import { baseUrl } from '../../../constants';
import './IdeaDashboard.css'
/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Button from '../../reogranisation/Questions/Button';
import posed from 'react-pose';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'
import FilledInput from '@material-ui/core/FilledInput';

export default function IdeaDashboardDetail(props) {
  const [user, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [userIdeas, setUserIdeas] = useState([]);
  const [automatchResults, DoAutomatch] = useState([]);
  const [automatch2, Do2] = useState([])
  const [currentValue, setCurrentValue] = useState([]);
  const [isShown, setIsShown] = useState({
    // 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false
  })
  const [patentDifference, setPatentDifference] = useState({
    // 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "", howProblemUnique: ""
  })
  // const [identifyProblem, setIdentifyProblem] = useState("");
  // const [problemSolution, setProblemSolution] = useState("");
  // const [howProblemUnique, setHowProblemUnique] = useState("");
  const ideasId = props.match.params.id

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideasId}/automatch`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then(automatch => DoAutomatch(automatch.body.autoMatch['automatch-results']['index-1']))
  }, []);
 
  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideasId}/automatch`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then(automatch => Do2(Object.values(automatch.body.autoMatch['automatch-results']['index-1'])))
  }, []);

  console.log(automatchResults)
  const updateShow = e => {
    setIsShown({
      ...isShown,
      [e.target.name]: true
    })
  }

  let automatchTitle = automatch2.map(result => result.bibliographic.title[0].text)

  let automatchText = automatch2.map(result =>
    result.passage.text.split('.').slice(1, -1).join() + '.'
  )

  let relevanceScore = automatch2.map(result => result.relevance.score)
  let relevanceNumber = automatch2.map(b => b.relevance.number)

  // if (typeof automatchResults.autoMatch === 'object') {
  //   console.table(automatchResults.autoMatch['0'].relevance)
  // }

  const updateDifference = e => {
    setPatentDifference({
      ...patentDifference,
      [e.target.name]: e.target.value
    });

  };
  const printValues = e => {
    e.preventDefault();
   
  };
 

// ONLY PROCEED if (arr.length === 10) !!!!!!!!!!!!!!!!! coz it takes time for the loop to complete
// let obj = newImageArray.find(o => o.name === 'string 1');

// console.log(obj);

  if (automatchResults) {

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
                  Automatch results
                </Heading>
                {Object.keys(automatchResults).map((key, index) => (
                  <StyledCard key={relevanceNumber[index]}>
                    <Link to={`ideas/${ideasId}/automatch/${relevanceNumber[index]}`} results={automatchResults} relevancenumber={relevanceNumber}>
                      <Paragraph>
                        Title: {automatchTitle[index]}
                        
                      </Paragraph>
                    </Link>
                    <Paragraph>
                      <strong>
                        Text:
                        </strong>
                      <br />
                      {automatchText[index]}
                    </Paragraph>
                    <Button onClick={console.log("Y")} text={`It's the same`} />
                    <div >
                      <button onClick={updateShow} text={`It's different`} name={key} style={{
                        width: '100%', height: 'auto', backgroundColor: 'inherit', color: 'inherit', position: 'relative',
                        alignSelf: 'flex-start', margin: '5px', borderRadius: '10px', padding: '2px', border: '1px solid',
                        alignItems: 'center', justifyContent: 'space-between'
                      }}
                      >It's different</button>
                      {
                        isShown[key] &&
                        <div>
                          <StyledTextField
                            id="filled-multiline-flexible"
                            InputLabelProps={{ style: { color: '#fff' }, }}
                            label="Also then, please explain to us how your idea is different (especially better) or similar to this patent:"
                            multiline
                            rowsMax="4"
                            fullWidth
                            margin="normal"
                            variant="filled"
                            value={patentDifference.key}
                            name={key}
                            type="text"
                            onChange={updateDifference}
                          />
                        </div>
                      }
                    </div>
                  </StyledCard>
                ))}
                <AddlQuestions>
                  <h1>Additional Questions:</h1>
                  <hr />
                  <StyledTextField
                    id="filled-multiline-flexible"
                    InputLabelProps={{ style: { color: '#fff' }, }}
                    label="Now that you know what is already out there, which problem does your idea solve?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    value={patentDifference.identifyProblem}
                    onChange={updateDifference}
                    name="identifyProblem"
                    type="text"
                  />
                  <StyledTextField
                    id="filled-multiline-flexible"
                    InputLabelProps={{ style: { color: '#fff' }, }}
                    label="How do you solve this problem?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    value={patentDifference.problemSolution}
                    // onChange={e => setProblemSolution(e.target.value)}
                    onChange={updateDifference}
                    name="problemSolution"
                    type="text"
                  />
                  <StyledTextField
                    id="filled-multiline-flexible"
                    InputLabelProps={{ style: { color: '#fff' }, }}
                    label="How is this (technically) unique?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    value={patentDifference.howProblemUnique}
                    onChange={updateDifference}
                    name="howProblemUnique"
                    type="text"
                  />
                  <Button text={'Submit'} onClick={printValues} type="submit" />
                </AddlQuestions>
              </StartContent>
            </div>
          </div>
        </Content>
      </Container>
    )
  } else {
    return (<Heading>Loading...</Heading>)
  }
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
const Content = styled.div`
    color: #ffffff;
    width: 80vw;
    max-width: 900px;
    
    
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
    
    margin: 18px 10px 10px 10px;
    font-size: 14px;
  `;
const StyledCard = styled(Card)`
    background-color: rgb(255,255,255, 0.3);
    padding-bottom: 5px;
  `;
const Container = styled.div`
    position: relative;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 4000px;
    background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
    display: flex;
  `;
const StyledTextField = styled(TextField)`
    background-color: rgb(255,255,255, 0.5);
    marginLeft: theme.spacing.unit;
    marginRight: theme.spacing.unit;
    
  `;
const AddlQuestions = styled.div`
    padding: 3em;
    border: 1px solid #ccc;
`