import React, { useState } from "react";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import "./IdeaDetails.css";
import { Button } from "@material-ui/core";

export default function IdeaDetails(props) {
  const { ideas } = props;
  const [show, setShow] = useState(false);

  const processTitle = (title) => {
    let splitTitle = title.split("?");
    const processedTitle = splitTitle[0];
    return processedTitle;
  };

  let industries = ideas[4]
    ? ideas[4].answers[0].qAnswer.map((ind) => {
        return <li key={ind.value}>{ind.label}</li>;
      })
    : null;

  let qAnswers = [];
  const qTitles = [];

  ideas.forEach((idea) => {
    idea.answers.forEach((question) => {
      if (question.qTitle.length > 50) {
        const title = processTitle(question.qTitle);
        return qTitles.push(title);
      } else {
        return qTitles.push(question.qTitle);
      }
    });
  });
  ideas.forEach((idea) => {
    idea.answers.forEach((answer) => {
      qAnswers.push(answer.qAnswer);
    });
  });

  qAnswers = qAnswers.map((answer) =>
    typeof answer === "object"
      ? answer[1]
        ? answer[1].value + " & " + answer[0].value
        : answer[0]
        ? answer[0].value
        : answer.value
      : answer
  );

  if (qAnswers[0] === "true") {
    qAnswers[0] = "yes";
  }

  const renderIdeaDetails = !show ? (
    <>
      <div className="ideadetailscontentsummary">
        <div key="1">
          <StyledCard>
            <h4>{qTitles[5]}:</h4>
            <p>{qAnswers[5]}</p>
          </StyledCard>
        </div>
        <div key="2">
          <StyledCard>
            <h4>{qTitles[6]}:</h4>
            <p>{qAnswers[6]}</p>
          </StyledCard>
        </div>
        <StyledCard>
          <h4>Industries:</h4>
          <ul>{industries}</ul>
        </StyledCard>
      </div>
      <StyledCard>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShow(!show)}
        >
          Show Details
        </Button>
      </StyledCard>
    </>
  ) : (
    <>
      <StyledCard>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShow(!show)}
        >
          Show Details
        </Button>
      </StyledCard>
      <div className="ideadetailscontent">
        {qTitles.map((title, index) => (
          <div key={index}>
            <StyledCard>
              <h4>{title}:</h4>
              <p>{qAnswers[index]}</p>
            </StyledCard>
          </div>
        ))}
      </div>
      <StyledCard>
      <Button
          variant="outlined"
          color="primary"
          onClick={() => setShow(!show)}
        >
          Hide Details
        </Button>
      </StyledCard>
    </>
  );
  return <>{renderIdeaDetails}</>;
}

const StyledCard = styled(Card)`
  background-color: rgba(255, 255, 255, 0.3);
  padding-left: 8px;
  padding-right: 8px;
`;
