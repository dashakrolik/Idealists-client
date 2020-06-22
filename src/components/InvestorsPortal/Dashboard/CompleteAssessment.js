/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useState, Component } from "react";
import posed from "react-pose";
import Button from "../../reogranisation/Questions/Button";
import request from "superagent";
import { baseUrl } from "../../../constants";
import { pdfjs } from "react-pdf";
import { color } from "style-value-types";
import { borderRadius } from "react-select/lib/theme";
import { relative } from "path";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";

const CompleteAssessment = (props) => {
  return (
    <div
      style={{
        minHeight: "1000px",
        padding: "10px",
        border: "1px solid #e5e5e5",
        backgroundImage:
          "linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1)",
      }}
    >
      <GroupContainer>
        <FlexRow>
          <FlexColumn>
            <GroupTitle>Submission complete!</GroupTitle>
          </FlexColumn>
        </FlexRow>
        <FlexRow>
          <FlexColumn>
            <GroupSubtitle>We'll be in touch with you soon.</GroupSubtitle>
          </FlexColumn>
        </FlexRow>
        <Button
          color="inherit"
          onClick={() =>
            props.authState.user.role === "expert"
              ? props.history.push("/Investors/dashboard")
              : props.history.push("/MyIdea/dashboard")
          }
          text={"Go to my dashboard"}
        />
      </GroupContainer>
    </div>
  );
};

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

const FormGroup = styled.div`
  padding: 5px 10px;
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
  margin-top: 70px;
`;

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding: 50px;
  width: 500px;
  margin-left: 130px;
  color: white;
  display: flex;
`;

export default withRouter(CompleteAssessment);
