import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import styled from "@emotion/styled";
import IdeaDetails from "../reogranisation/IdeaDetails/IdeaDetails";
// import IdeaDashboardDetail from "../SpecialistPortal/Dashboard/SpecialistIdeaDetails";
import BidSlider from "./BidSlider";
import { Redirect } from "react-router-dom";
import bid from "../../res/bid.png";
import ProgressBar from "../reogranisation/ProgressBar/ProgressBar";
import Button from "../reogranisation/Questions/Button";
import { Link } from "react-router-dom";

export default function CofounderIdeaDetail(props) {
  const ideaId = props.match.params.id;
  const [userIdeas, setUserIdeas] = useState([]);
  const [showSlider, setShowSlider] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [showButton, setButton] = useState(true);
  const [showBidders, setShowBidders] = useState(false);
  const [ideaBids, setIdeaBids] = useState([]);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideaId}`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => setUserIdeas(res.body.idea));
  }, []);

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideaId}/bids`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => setIdeaBids(res.body));
  }, []);

  if (props.authState.loggedIn === false)
    return <Redirect to="/CofounderStart" />;

  if (!props.authState.user) {
    props.user();
  }

  const handleSlider = () => {
    setShowSlider(true);
    setShowImage(false);
  };

  return (
    <div className="dashboard-container">
      <Container>
        <Left>
          <FlexRow>
            <FlexColumn>
              <Left>
                {!showSlider ? (
                  <div className="bid-icon-wrap">
                    <img
                      className="icons"
                      src={bid}
                      alt="Bid on idea"
                      onClick={() => {
                        handleSlider();
                      }}
                      showImage={showImage}
                    />
                    <h3>Bid on this idea</h3>
                  </div>
                ) : (
                  <BidSlider
                    authState={props.authState}
                    ideaId={ideaId}
                    showSlider={!showSlider}
                    displaySuccess={setDisplaySuccess}
                  />
                )}
                {displaySuccess ? (
                  <StyledDiv>Bid submission success!</StyledDiv>
                ) : null}
              </Left>
            </FlexColumn>
          </FlexRow>
          <FlexRow>
            <ProgressBar
              token={props.authState.token}
              ideasId={props.match.params.id}
            />
          </FlexRow>
        </Left>
        <Right>
          {!showBidders ? (
            <Button
              text="See other bidders"
              onClick={() => {
                setShowBidders(true);
              }}
            />
          ) : (
            <StyledDiv>
              {" "}
              {ideaBids.map((bid) => {
                return (
                  <StyledLink to={`/Cofounder/dashboard/${bid.userid}/profile`}>
                    <span key={bid.id}>
                      {bid.firstname} {bid.lastname}
                    </span>
                  </StyledLink>
                );
              })}
              <Button
                text=" hide bidders"
                onClick={() => {
                  setShowBidders(false);
                }}
              />
            </StyledDiv>
          )}
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
  border-radius: 10px;
  padding: 20px;
  color: white;
  margin-bottom: 20px;
  margin-top: 45px;
`;

const Left = styled.div`
  grid-area: left;
  width: 100%;
  // height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  padding-top: 50px;
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
  .bid-icon-wrap {
    border: 1px solid white;
    border-radius: 10px;
  }
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
  // height: 100%;
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
const StyledLink = styled(Link)`
textDecoration: none;
color: white;
&:focus,  &:visited, &:link, &:active {
  text-decoration: none;
  &:hover {
    transition: ease-in;
  }
`;
