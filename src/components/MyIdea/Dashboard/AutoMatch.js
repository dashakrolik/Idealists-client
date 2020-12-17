import { useEffect, useState } from "react";
import request from "superagent";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../constants";
import "./IdeaDashboard.css";
/** @jsx jsx */
import { css, Global, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import Button from "../../reogranisation/Questions/Button";
import posed from "react-pose";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Spinner from "../../reogranisation/Spinner";

export default function IdeaDashboardDetail(props) {
  // const [userLoggedIn, setUserLoggedIn] = useState(true);
  // const [userIdeas, setUserIdeas] = useState([]);
  const [automatchResults, DoAutomatch] = useState([]);
  // const [automatch2, Do2] = useState([])
  // const [currentValue, setCurrentValue] = useState([]);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [errorFound, setErrorFound] = useState(false);
  //const [errorMessage, setErrorMessage] = useState("");
  const [isShown, setIsShown] = useState({});
  const [patentDifference, setPatentDifference] = useState({
    // 0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "", howProblemUnique: ""
  });
  // const [identifyProblem, setIdentifyProblem] = useState("");
  // const [problemSolution, setProblemSolution] = useState("");
  // const [howProblemUnique, setHowProblemUnique] = useState("");
  const [loading, setLoading] = useState(true);
  const ideasId = props.match.params.id;

  const isUser = props.authState.user.role === "user" ? true : false;

  useEffect(() => {
    setLoading(true);
    request
      .get(`${baseUrl}/ideas/${ideasId}/automatch`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((automatch) => {
        if (
          automatch.body.status !== "error" &&
          automatch.body.statusCode === 200
        ) {
          DoAutomatch(
            Object.values(
              automatch.body.autoMatch["ipscreener-results"]["index-1"]
            )
          );
        } else {
          // if there is any error
          setErrorFound(true);
          //setErrorMessage(automatch.body.message);
        }
      })
      .catch((err) => console.error(err))
      .finally(setLoading(false));

    if (!isUser) {
      setLoading(true);
      request
        .get(`${baseUrl}/ideas/${ideasId}`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => {
          setPatentDifference(JSON.parse(res.body.autoMatchComments));
        })
        .catch((err) => console.error(err))
        .finally(setLoading(false));
    }
  }, []);

  const updateShow = (e) => {
    setIsShown({
      ...isShown,
      [e.target.name]: true,
    });
  };

  let automatchTitle = automatchResults.map(
    (result) => result.bibliographic.title[0].text
  );

  let automatchText = automatchResults.map(
    (result) => result.passage.text.split(".").slice(1, -1).join() + "."
  );

  // let relevanceScore = automatchResults.map(result => result.relevance.score)
  let relevanceNumber = automatchResults.map((b) => b.relevance.number);

  const updateDifference = (e) => {
    setPatentDifference({
      ...patentDifference,
      [e.target.name]: e.target.value,
    });
  };

  // Validate if user provides responses to all (10) matching patents & (3) additional questions.
  // Enable the submit button only when the user responds to all (13 at present) questions.
  let countAnswers = 0;
  useEffect(() => {
    if (isUser) {
      const allKeys = Object.keys(patentDifference);
      const resultsKeys = Object.keys(automatchResults);
      const addnlQuesKeys = allKeys.filter((key) => {
        if (!resultsKeys.includes(key)) {
          countAnswers++;
          return key;
        }
      });

      if (resultsKeys.length !== 0) {
        for (let i = 0; i < resultsKeys.length; i++) {
          if (patentDifference[resultsKeys[i]]) countAnswers += 1;
        }

        if (addnlQuesKeys.length !== 0) {
          for (let i = 0; i < addnlQuesKeys.length; i++) {
            if (patentDifference[addnlQuesKeys[i]] !== "") {
            } else countAnswers -= 1;
          }
        }

        if (countAnswers === resultsKeys.length + 3) {
          setEnableSubmit(true);
        } else {
          setEnableSubmit(false);
        }
      }
    }
  }, [patentDifference]);

  const sendValues = () => {
    request
      .put(`${baseUrl}/ideas/${ideasId}`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .send({ autoMatchComments: patentDifference })
      .then((res) => {
        if (res.status === 200) {
          updateProgress(ideasId);
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          //
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        setDisplaySuccess(true);
      });
  };

  const updateProgress = (id) => {
    request
      .put(`${baseUrl}/ideas/${ideasId}/progress`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .send({ step02: true })
      .then((res) => {
        if (res.status === 200) {
          // console.log("success, idea progress moved forward");
        }
      })
      .catch((err) => {
        if (err) {
          console.log("error", err);
        }
      });
  };

  if (displaySuccess) {
    return (
      <Container>
        <Global
          styles={css`
            body {
              background-image: linear-gradient(
                to right top,
                #1a3d7c,
                #195d9c,
                #1f7fbb,
                #31a2d7,
                #4cc5f1
              );
            }
          `}
        />
        <Content>
          <div
            css={css`
              grid-area: content-area;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                flex-direction: column;
              `}
            >
              <StartContent
                css={css`
                  display: flex;
                  flex-direction: column;
                  width: auto;
                  margin-bottom: 60px;
                `}
              >
                <Heading
                  css={css`
                    @media only screen and (orientation: portrait) {
                      margin-top: 60px;
                    }
                  `}
                >
                  <GroupContainer>
                    <FlexRow>
                      <FlexColumn>
                        <GroupTitle>
                          Your comments have been submitted successfully.
                        </GroupTitle>
                      </FlexColumn>
                    </FlexRow>
                    <FlexRow>
                      <FlexColumn>
                        <GroupSubtitle>
                          We'll be in touch with you soon.
                        </GroupSubtitle>
                      </FlexColumn>
                    </FlexRow>
                    <Button
                      color="inherit"
                      onClick={() => props.history.push("/MyIdea/dashboard")}
                      text={"Go to my dashboard"}
                    />
                  </GroupContainer>
                </Heading>
              </StartContent>
            </div>
          </div>
        </Content>
      </Container>
    );
  }
  // ONLY PROCEED if (arr.length === 10) !!!!!!!!!!!!!!!!! coz it takes time for the loop to complete
  // let obj = newImageArray.find(o => o.name === 'string 1');

  if (loading) {
    return (
      <SpinnerStyle>
        <SpinnerPostion>
          <Spinner />
        </SpinnerPostion>
      </SpinnerStyle>
    );
  }
  if (!errorFound && automatchResults.length >= 1) {
    return (
      <Container>
        <Global
          styles={css`
            body {
              background-image: linear-gradient(
                to right top,
                #1a3d7c,
                #195d9c,
                #1f7fbb,
                #31a2d7,
                #4cc5f1
              );
            }
          `}
        />
        <Content>
          <div
            css={css`
              grid-area: content-area;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                flex-direction: column;
              `}
            >
              <StartContent
                css={css`
                  display: flex;
                  flex-direction: column;
                  width: auto;
                  margin-bottom: 60px;
                `}
              >
                <Heading
                  css={css`
                    @media only screen and (orientation: portrait) {
                      margin-top: 60px;
                    }
                  `}
                >
                  Automatch results
                </Heading>
                {Object.keys(automatchResults).map((key, index) => (
                  <StyledCard key={relevanceNumber[index]}>
                    <Link
                      to={`/ideas/${ideasId}/automatch/${relevanceNumber[index]}`}
                      results={automatchResults}
                      relevancenumber={relevanceNumber}
                    >
                      <Paragraph>
                        <strong>{automatchTitle[index]}</strong>
                        <br />( click to open patent )
                      </Paragraph>
                    </Link>
                    <Paragraph>
                      <strong>Short summary:</strong>
                      <br />
                      {automatchText[index]}
                    </Paragraph>

                    {isUser ? (
                      <div>
                        <button
                          onClick={updateDifference}
                          text={`It's the same`}
                          name={key}
                          value={false}
                          style={{
                            width: "100%",
                            height: "30px",
                            backgroundColor: "inherit",
                            color: "inherit",
                            position: "relative",
                            alignSelf: "flex-start",
                            margin: "5px",
                            borderRadius: "10px",
                            padding: "2px",
                            border: "1px solid",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          It's the same
                        </button>
                        <button
                          onClick={updateShow}
                          text={`It's different`}
                          name={key}
                          style={{
                            width: "100%",
                            height: "30px",
                            backgroundColor: "inherit",
                            color: "inherit",
                            position: "relative",
                            alignSelf: "flex-start",
                            margin: "5px",
                            borderRadius: "10px",
                            padding: "2px",
                            border: "1px solid",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          It's different
                        </button>
                        {isShown[key] && (
                          <div>
                            <StyledTextField
                              id="filled-multiline-flexible"
                              InputLabelProps={{ style: { color: "#fff" } }}
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
                        )}
                      </div>
                    ) : (
                      <UserFeedback>
                        <p>
                          User feedback:
                          {patentDifference[key] === "false"
                            ? ` "this patent is the same like my idea".`
                            : patentDifference[key] &&
                              ` "My idea is different: ${patentDifference[key]}"`}
                        </p>
                      </UserFeedback>
                    )}
                  </StyledCard>
                ))}
                <AddlQuestions>
                  <h1>Additional Questions:</h1>
                  <hr />
                  <StyledTextField
                    id="filled-multiline-flexible"
                    InputLabelProps={{ style: { color: "#fff" } }}
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
                    disabled={!isUser ? true : false}
                  />
                  <StyledTextField
                    id="filled-multiline-flexible"
                    InputLabelProps={{ style: { color: "#fff" } }}
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
                    disabled={!isUser ? true : false}
                  />
                  <StyledTextField
                    id="filled-multiline-flexible"
                    InputLabelProps={{ style: { color: "#fff" } }}
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
                    disabled={!isUser ? true : false}
                  />
                  <Button
                    text={isUser ? "Submit" : "Back"}
                    onClick={isUser ? sendValues : () => props.history.goBack()}
                    type="submit"
                    disabled={isUser ? !enableSubmit : false}
                  />
                </AddlQuestions>
              </StartContent>
            </div>
          </div>
        </Content>
      </Container>
    );
  } else {
    return (
      <Container>
        {errorFound ? (
          <div>
            <Global
              styles={css`
                body {
                  background-image: linear-gradient(
                    to right top,
                    #1a3d7c,
                    #195d9c,
                    #1f7fbb,
                    #31a2d7,
                    #4cc5f1
                  );
                }
              `}
            />
            <Content>
              <div
                css={css`
                  grid-area: content-area;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                  `}
                >
                  <StartContent
                    css={css`
                      display: flex;
                      flex-direction: column;
                      width: auto;
                      margin-bottom: 60px;
                    `}
                  >
                    <Heading
                      css={css`
                        @media only screen and (orientation: portrait) {
                          margin-top: 60px;
                        }
                      `}
                    >
                      First patent check
                    </Heading>
                    <Paragraph>
                      <h2>
                        {`Unfortunately, the information you supplied about your idea on the idea-form was too brief.
Because of this, we are not able to look for matching patents and can’t continue your idea.
Please re-submit your idea with a more extensive explanation on what your idea exactly is.
If you have any questions, please contact us at any time at support@the-idealists.com`}
                      </h2>
                    </Paragraph>
                  </StartContent>
                </div>
              </div>
            </Content>
          </div>
        ) : (
          <Spinner />
        )}
      </Container>
    );
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

  @media only screen and (orientation: portrait) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: "logo-area" "content-area";
  }
  @media only screen and (orientation: landscape) {
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
  background-color: rgb(255, 255, 255, 0.3);
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
  background-image: linear-gradient(
    to right top,
    #1a3d7c,
    #195d9c,
    #1f7fbb,
    #31a2d7,
    #4cc5f1
  );
  display: flex;
`;
const StyledTextField = styled(TextField)`
  background-color: rgb(255, 255, 255, 0.5);
  marginleft: theme.spacing.unit;
  marginright: theme.spacing.unit;
`;
const AddlQuestions = styled.div`
  padding: 3em;
  border: 1px solid #ccc;
`;

const FlexRow = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  @media only screen and (orientation: portrait) {
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
  position: relative;
  padding: 5px 15px;
  flex: 1;
  margin-bottom: 16px;
`;

const GroupSubtitle = styled.div`
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #ffffff;
  position: relative;
  padding: 5px 15px;
  flex: 1;
  margin-bottom: 32px;
`;

const PGroupContainer = posed.div({
  preEnter: {
    x: 600,
    originX: "50%",
    originY: "50%",
    opacity: 0,
    scale: 0.69,
    transition: {
      default: { ease: "easeInOut", duration: 400 },
    },
  },
  enter: {
    x: 0,
    originX: "50%",
    originY: "50%",
    opacity: 1.0,
    scale: 1.0,
    transition: {
      default: { ease: "easeInOut", duration: 400 },
    },
  },
  exit: {
    x: -600,
    originX: "50%",
    originY: "50%",
    opacity: 0,
    scale: 0.69,
    transition: { ease: "easeInOut", duration: 400 },
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

const SpinnerStyle = styled.div`
  display: flex;
  align-itmes: center;
  justify-content: center;
  background-image: linear-gradient(
    to right top,
    #1a3d7c,
    #195d9c,
    #1f7fbb,
    #31a2d7,
    #4cc5f1
  );
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 100%;
`;

const SpinnerPostion = styled.div`
  margin-top: 370px;
`;

const UserFeedback = styled.div`
  height: auto;
  padding: 0.5em;
  background-color: rgba(256, 256, 256, 0.2);
  /*
  height: 2.8em;
  border-radius: 10px;
  */
  font-size: 0.9em;
  font-weight: 550;
`;
