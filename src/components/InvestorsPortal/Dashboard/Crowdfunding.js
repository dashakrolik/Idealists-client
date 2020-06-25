import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import "./InvestorDashboard.css";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";

export default function CrowdFunding(props) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/current`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => setUserData(res.body));
    else props.history.push("/InvestorStart");
  }, []);

  return (
    <div className="dashboard-container">
      <br />
      <br />
      <h2 className="title">This is {userData.firstName}'s dashboard</h2>
      <h2 className="title">Back ideas through crowdfunding</h2>
      <StyledCard>
        When an idea has successfully passed through the first 8 stages it is
        eligible for crowdfunding. Only validated, unique ideas with a complete
        founder-team will be presented on our crowdfunding platform. All idea
        files will include all the results from all past 8 stages, so you can
        easily assess whether this is a fitting investment for you [Open]
      </StyledCard>
    </div>
  );
}

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding: 50px;
  width: 500px;
  margin: auto;
  display: flex;
  color: white;
`;
