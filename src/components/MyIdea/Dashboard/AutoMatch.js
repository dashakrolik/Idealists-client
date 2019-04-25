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
import { value } from 'popmotion';



export default function IdeaDashboardDetail(props) {
  const [user, setUserData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [userIdeas, setUserIdeas] = useState([]);
  const ideasId = props.match.params.id;
  const [automatchResults, DoAutomatch] = useState([]);
  const [currentValue, setCurrentValue] = useState([]);

  const [patentDifference, setPatentDifference] = useState("");
  const [identifyProblem, setIdentifyProblem] = useState("");
  const [problemSolution, setProblemSolution] = useState("");
  const [howProblemUnique, setHowProblemUnique] = useState("");

  useEffect(() => {
    request
      .get(`${baseUrl}/automatch/986`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then(automatch => DoAutomatch(Object.values(automatch.body.autoMatch['automatch-results']['index-1'])))
  }, []);


  const ToggleContent = ({ toggle, content }) => {
    const [isShown, setIsShown] = useState(false);
    const hide = () => setIsShown(false);
    const show = () => setIsShown(true);

    return (
      <>
        {toggle(show)}
        {isShown && content(hide)}
      </>
    );
  };

  let automatchTitle = automatchResults.map(result => result.bibliographic.title[0].text)

  // console.log(automatchTitle)
  // console.log(automatchResults)
  let automatchText = automatchResults.map(result =>
    result.passage.text.split('.').slice(1, -1).join() + '.'
  )
  // console.log(automatchText)
  let relevanceScore = automatchResults.map(result => result.relevance.score)
  // console.log(relevanceScore)

  let relevanceNumber = automatchResults.map(b => b.relevance.number)
  if (typeof automatchResults.autoMatch === 'object') {
    // console.table(automatchResults.autoMatch['0'].relevance)
  }

  console.log(automatchResults)

  const handleChange = (e) => {
    setCurrentValue(e.target.value);

  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currentValue)

  };

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
                    <Link to={`ideas/${ideasId}/automatch/${relevanceNumber[index]}`} results={automatchResults}>
                      <Paragraph>
                        {relevanceScore[index]} | {automatchTitle[index]}
                      </Paragraph>
                    </Link>
                    <Paragraph>
                      {automatchText[index]}
                    </Paragraph>
                    {/* <Controls css={css`display: flex; flex-wrap: wrap; justify-content: flex-start;`}> 
                      <Button text={`It's different`} onClick={handleClickOpen}/>  */}
                    <Button text={`It's the same`} />


                    <ToggleContent
                      toggle={show => <Button onClick={show} text={`It's different`} />}
                      content={hide => (
                        <div>
                          <StyledTextField
                            id="filled-multiline-flexible"
                            InputLabelProps={{
                              style: { color: '#fff' },
                              }}
                              label="Also then, please explain to us how your idea is different (especially better) or similar to this patent:"
                              multiline
                              rowsMax="4"
                              fullWidth
                              margin="normal"
                              variant="filled"
                              value={patentDifference}
                              onChange={e => setPatentDifference(e.target.value)}
                              name="patentDifference"
                              type="text"
                            />
                            <Button text={`submit`} />
                          </div>
                        )}
                      />
                    {/* </Controls> */}

                  </StyledCard>

                ))}
                <AddlQuestions>
                  <h1>Additional Questions:</h1>
                  <hr />
                  <StyledTextField
                    id="filled-multiline-flexible"
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                    label="Now that you know what is already out there, which problem does your idea solve?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    value={identifyProblem}
                    onChange={e => setIdentifyProblem(e.target.value)}
                    name="identifyProblem"
                    type="text"
                  />
                  <StyledTextField
                    id="filled-multiline-flexible"
                    InputLabelProps={{
                      style: { color: '#fff' },
                      }}
                    label="How do you solve this problem?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    value={problemSolution}
                    onChange={e => setProblemSolution(e.target.value)}
                    name="problemSolution"
                    type="text"
                  />
                  <StyledTextField
                    id="filled-multiline-flexible"
                    InputLabelProps={{
                      style: { color: '#fff' },
                      }}
                    label="How is this (technically) unique?"
                    multiline
                    rowsMax="4"
                    fullWidth
                    margin="normal"
                    variant="filled"
                    value={howProblemUnique}
                    onChange={e => setHowProblemUnique(e.target.value)}
                    name="howProblemUnique"
                    type="text"
                  />
                  <Button text={`submit`} />
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
