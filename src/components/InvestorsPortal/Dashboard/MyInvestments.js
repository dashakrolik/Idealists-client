import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import "./InvestorDashboard.css";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";
import Button from '../../reogranisation/Questions/Button';


export default function AssessIdeas(props) {
  const [userData, setUserData] = useState({});
  const history = useHistory(); 

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => setUserData(res.body));
    else props.history.push("/InvestorStart");
  }, []);

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas`)
      .set("Authorization", `Bearer ${props.authState.token}`);
  }, []);

  return (
    <div className="dashboard-container">
      <br />
      <br />
      <h2 className="title">This is {userData.firstName}'s dashboard</h2>
      <div style={{ width: "12rem", margin: "auto", paddingBottom: "50px" }}>
      <Button text="Go back" onClick={() => history.goBack()}/>
      </div>
      <StyledCard>
        Here you can track how all of your investments are performing and ask
        the founders questions or help them with your feedback.
      </StyledCard>
    </div>
  );
}

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding: 50px;
  width: 500px;
  margin: auto;
  color: white;
  display: flex;
`;
