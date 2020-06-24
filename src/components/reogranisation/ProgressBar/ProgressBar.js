import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../../constants";
import styled from "@emotion/styled";

export default function ProgressBar(props) {
  const [progress, setProgress] = useState([]);

  const ideasId = props.ideasId;
console.log("rpog??????", progress)

  useEffect(() => {
    request
      .get(`${baseUrl}/ideas/${ideasId}`)
      .set("Authorization", `Bearer ${props.token}`)
      .then((res) => {
        setProgress(res.body.progress);
      });
  }, []);

  const progressStep = [""];

  for (let i = 1; i < 10; i++) {
    const step = progress[`step0${i}`]
      ? "is-done"
      : progress[`step0${i - 1}`]
      ? "current"
      : "";
    progressStep.push(step);
  }

  progressStep.push(progress[`step10`] ? "is-done" : progress['step09'] ? "current" : "")

  return (
    <FlexRow>
      <FlexColumn>
        <StyledDiv>
          <h1>Assessing the Idea:</h1>
          <hr />
          <ul className="step-progress">
            <li className={`step-progress-item ${progressStep[1]}`}>
              <strong>Submit the idea</strong>
            </li>
            <li className={`step-progress-item ${progressStep[2]}`}>
              <strong>First patent check (1 week)</strong>
            </li>
            <li className={`step-progress-item ${progressStep[3]}`}>
              <strong>Expert check (2 weeks)</strong>
            </li>
            <li className={`step-progress-item ${progressStep[4]}`}>
              <strong>Second patent check (2 weeks)</strong>
            </li>
            <li className={`step-progress-item ${progressStep[5]}`}>
              <strong>Validation phase (4 weeks)</strong>
            </li>
            <li className={`step-progress-item ${progressStep[6]}`}>
              <strong>Final patent check (2 weeks)</strong>
            </li>
            <li className={`step-progress-item ${progressStep[7]}`}>
              <strong>Business plan phase (2 weeks)</strong>
            </li>
            <li className={`step-progress-item ${progressStep[8]}`}>
              <strong>Co-Founder phase(2 weeks)</strong>
            </li>
            <li className={`step-progress-item ${progressStep[9]}`}>
              <strong>Funding phase (2 weeks)</strong>
            </li>
            <li className={`step-progress-item ${progressStep[10]}`}>
              <strong>Company is born (1 week)</strong>
            </li>
          </ul>
        </StyledDiv>
      </FlexColumn>
    </FlexRow>
  );
}

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