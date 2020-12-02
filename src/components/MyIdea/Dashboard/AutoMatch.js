import { useEffect, useState } from 'react';
import request from 'superagent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../constants';
import './IdeaDashboard.css'
/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import Button from '../../reogranisation/Questions/Button';
import posed from 'react-pose';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'
import Spinner from '../../reogranisation/Spinner';

export default function IdeaDashboardDetail(props) {
  // const [user, setUserData] = useState({});
  // const [userLoggedIn, setUserLoggedIn] = useState(true);
  // const [userIdeas, setUserIdeas] = useState([]);
  const [automatchResults, DoAutomatch] = useState([]);
  // const [automatch2, Do2] = useState([])
  // const [currentValue, setCurrentValue] = useState([]);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [isShown, setIsShown] = useState({
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
      .then(automatch => DoAutomatch(Object.values(automatch.body.autoMatch['automatch-results']['index-1'])))
      .catch(err => console.error(err))
  }, []);

  // useEffect(() => {
  //   request
  //     .get(`${baseUrl}/ideas/${ideasId}/automatch`)
  //     .set("Authorization", `Bearer ${props.authState.token}`)
  //     .then(automatch => Do2(Object.values(automatch.body.autoMatch['automatch-results']['index-1'])))
  // }, []);

  const updateShow = e => {
    setIsShown({
      ...isShown,
      [e.target.name]: true
    })
  }

  let automatchTitle = automatchResults.map(result => result.bibliographic.title[0].text)

  let automatchText = automatchResults.map(result =>
    result.passage.text.split('.').slice(1, -1).join() + '.'
  )

  // let relevanceScore = automatchResults.map(result => result.relevance.score)
  let relevanceNumber = automatchResults.map(b => b.relevance.number)


  const updateDifference = e => {
    setPatentDifference({
      ...patentDifference,
      [e.target.name]: e.target.value
    });

  };
  const sendValues = () => {
    request
      .put(`${baseUrl}/ideas/${ideasId}`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .send({ autoMatchComments: patentDifference })
      .then(res => {
        if (res.status === 200) {
          setDisplaySuccess(true)
        }
      })
      .catch(err => {
        if (err.status === 400) {
          //
        } else {
          console.error(err)
        }
      })
  };

  if (displaySuccess) {
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

                  <GroupContainer>
                    <FlexRow><FlexColumn><GroupTitle>Succesfully submit your comments to explain difference with patents.</GroupTitle></FlexColumn></FlexRow>
                    <FlexRow><FlexColumn><GroupSubtitle>We'll be in touch with you soon.</GroupSubtitle></FlexColumn></FlexRow>
                    <Button color="inherit" onClick={() => props.history.push('/MyIdea/dashboard')} text={'Go to my dashboard'} />
                  </GroupContainer>
                </Heading>
              </StartContent>
            </div>
          </div>
        </Content>
      </Container>
    )
  }

  // ONLY PROCEED if (arr.length === 10) !!!!!!!!!!!!!!!!! coz it takes time for the loop to complete
  // let obj = newImageArray.find(o => o.name === 'string 1');

  if (automatchResults.length >= 1) {

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
                    <Link to={`/ideas/${ideasId}/automatch/${relevanceNumber[index]}`} results={automatchResults} relevancenumber={relevanceNumber}>
                      <Paragraph>
                        <strong>{automatchTitle[index]}</strong><br />
                        ( click to open patent )

                      </Paragraph>
                    </Link>
                    <Paragraph>
                      <strong>
                        Short summary:
                        </strong>
                      <br />
                      {automatchText[index]}
                    </Paragraph>
                    {/* <Button name={key} onClick={updateDifference} text={`It's the same`} value={false} /> */}
                    <div >
                      <button onClick={updateDifference} text={`It's the same`} name={key} value={false} style={{
                        width: '100%', height: '30px', backgroundColor: 'inherit', color: 'inherit', position: 'relative',
                        alignSelf: 'flex-start', margin: '5px', borderRadius: '10px', padding: '2px', border: '1px solid',
                        alignItems: 'center', justifyContent: 'space-between'
                      }}
                      >It's the same</button>


                      <button onClick={updateShow} text={`It's different`} name={key} style={{
                        width: '100%', height: '30px', backgroundColor: 'inherit', color: 'inherit', position: 'relative',
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
                  <Button text={'Submit'} onClick={sendValues} type="submit" />
                </AddlQuestions>
              </StartContent>
            </div>
          </div>
        </Content>
      </Container>
    )
  } else {
    return (
      <Container>
        <Spinner />
      </Container>
    )
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
    margin: 100px 10px 80px 10px;
  `;
const Paragraph = styled.div`
    display: block;
    
    margin: 18px 10px 10px 10px;
    font-size: 14px;
  `;
const StyledCard = styled(Card)`
    background-color: rgb(255,255,255, 0.3);
    padding-bottom: 5px;
    margin-bottom: 10px;
  `;
const Container = styled.div`
    position: relative;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    min-height: 100%;
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
`;


const FlexRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  @media only screen and (orientation:portrait) { 
    flex-direction: column;
}
`;

const FlexColumn = styled.div`
  display: flex;
  flex: 1;
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

const PGroupContainer = posed.div({
  preEnter: {
    x: 600,
    originX: '50%',
    originY: '50%',
    opacity: 0,
    scale: 0.69,
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
    transition: { ease: 'easeInOut', duration: 400 },
  },
});

const GroupContainer = styled(PGroupContainer)`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  flex-grow: 1;
`;

