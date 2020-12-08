import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import styled from "@emotion/styled";
import IdeaDetails from "../reogranisation/IdeaDetails/IdeaDetails";
// import IdeaDashboardDetail from "../SpecialistPortal/Dashboard/SpecialistIdeaDetails";
import BidSlider from "./BidSlider";
import { Redirect } from "react-router-dom";
import bid from '../../res/bid.png'



export default function CofounderIdeaDetail(props) {

  console.log(props)

  const [userIdeas, setUserIdeas] = useState([]);
  const ideaId = props.match.params.id;
  const [show, setShow] = useState(false)



  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideaId}`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) =>
        setUserIdeas(res.body.idea)
      );
  }, []);
  console.log('userIdeas', userIdeas)

  if (props.authState.loggedIn === false) return <Redirect to="/CofounderStart" />;

  if (!props.authState.user) {
    console.log(props.authState)
    props.user();
  }

  // return <div className="dashboard-container">

  function showSlider() {
    setShow(true)
  }

  return (
    <div className="dashboard-container">
      <Container>
        <Left>
          <FlexRow>
            <FlexColumn>
              <StyledDiv>
                <Left>
                  {!show ? (
                    <div>
                      <img className="icons" src={bid} alt="Bid on idea" onClick={() => {
                        showSlider()
                      }} />
                      <h3>Bid on this idea</h3>
                    </div>
                  ) : null}
                  <BidSlider authState={props.authState} ideaId={ideaId} show={!show} /></Left>
              </StyledDiv>
            </FlexColumn>
          </FlexRow>
        </Left>
        <Right>
          <Content>
            <h1 className="header"> Questions and Answers about Idea:</h1>
            <IdeaDetails user={props.authState.user} ideas={userIdeas} />
          </Content>
        </Right>
      </Container>
    </div>
  );
}


const StyledDiv = styled.div`
  margin: 0 auto;
  width: 330px;
  font-family: "Helvetica";
  font-size: 14px;
  border: 1px solid #ccc;
  padding: 20px;
  color: white;
  margin-bottom: 20px;
  margin-top: 45px;
`;

const Left = styled.div`
  grid-area: left;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding-top: 80px;
  padding-left: 30px;
`;

const FlexRow = styled.div`
  display: flex;
  @media only screen and (orientation: portrait) {
    flex-direction: column;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex: 1;
`;

const Content = styled.div`
  align-self: center;
  justify-self: center;
  color: #ffffff;
  width: 90vw;
  max-width: 800px;
  height: auto;
  padding: 20px;
`;

const Right = styled.div`
  grid-area: right;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding-top: 100px;
`;

const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";
  background-image: linear-gradient(
    to right top,
    #1a3d7c,
    #195d9c,
    #1f7fbb,
    #31a2d7,
    #4cc5f1
  );
`;











