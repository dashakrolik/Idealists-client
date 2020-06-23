import React from "react";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import "./AssessmentSection.css";

export default function AssessmentSection(props) {
  const { assessments, industryIdea } = props;

  function renderIndustry(user) {
    const expertIndustryArr = user.industry.replace(/[{}"]/g, "").split(",");
    const ideaIndustryArr = industryIdea.replace(/[{}"]/g, "").split(",");
    return expertIndustryArr.map((indu) => {
      if (ideaIndustryArr.includes(indu)) {
        return (
          <strong key={indu}>
            <li key={indu}>{indu}</li>
          </strong>
        );
      } else {
        return <li key={indu}>{indu}</li>;
      }
    });
  }

  const renderAssessments =
    assessments.length >= 1 ? (
      assessments.map((assessm) => {
        let { user, assessment } = assessm;
        let date = new Date(assessm.createdAt);
        return (
          <StyledCard key={assessm.id}>
            <div className="assessment-container">
              <div className="left">
                {" "}
                <h4>
                  {user.firstName} {user.lastName}
                </h4>
                <h5>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </h5>
                <h5>
                  {user.role === "specialist" ? (
                    <>
                      {user.specialistType.charAt(0).toUpperCase() +
                        user.specialistType.slice(1)}
                      Specialist
                    </>
                  ) : null}
                </h5>
                {user.role === "expert" && user.industry ? (
                  <>
                    <ul>{renderIndustry(user)}</ul>
                  </>
                ) : null}
                <p>Assessment weight: {assessm.weight}</p>
                <footer>{date.toUTCString()}</footer>
              </div>
              <div className="right">
                <h4>Will people want this?</h4>
                <p>
                  <strong>{assessment.willPeopleWantThis}/10</strong>
                  <br></br>
                  {assessment.explanation}
                </p>
                <h4>Does this solve a problem people currently have?</h4>
                <p>
                  <strong>{assessment.doesThisSolveProblem}/10</strong>
                  <br></br>
                  {assessment.explanation2}
                </p>
                <h4>Is it, in your opinion, a good idea?</h4>
                <p>
                  <strong>{assessment.isItAGoodIdea}/10</strong>
                  <br></br>
                  {assessment.explanation4}
                </p>
                <h4>Is it the right timing for this idea?</h4>
                <p>
                  <strong>{assessment.isThisTheRightTiming}/10</strong>
                  <br></br>
                  {assessment.explanation3}
                </p>
                {assessment.proReason1 === "" &&
                assessment.explanation5 === "" ? null : (
                  <>
                    <h4>
                      Imagine you’re an advocate for this idea. Name up to 5
                      reasons why you would be so ‘pro’ this idea
                    </h4>
                    <ol>
                      <li>{assessment.proReason1}</li>
                      <li>{assessment.proReason2}</li>
                      <li>{assessment.proReason3}</li>
                      <li>{assessment.proReason4}</li>
                      <li>{assessment.proReason5}</li>
                    </ol>
                    <h4>
                      Imagine you’re an opponent of this idea. Name up to 5
                      reasons why you would be so ‘against’ this idea:
                    </h4>
                    <ol>
                      <li>{assessment.againstReason1}</li>
                      <li>{assessment.againstReason2}</li>
                      <li>{assessment.againstReason3}</li>
                      <li>{assessment.againstReason4}</li>
                      <li>{assessment.againstReason5}</li>
                    </ol>
                    <h4>What do you expect as time to impact for this idea?</h4>
                    <p>
                      <strong>
                        {assessment.whatDoYouExpectAsTimeImpact}/10
                      </strong>
                      <br></br>
                      {assessment.explanation5}
                    </p>
                    <h4>
                      What do you expect as magnitude of impact for this idea?
                    </h4>
                    <p>
                      <strong>
                        {assessment.whatDoYouExpectAsMagnitude}/10
                      </strong>
                      <br></br>
                      {assessment.explanation6}
                    </p>
                    <h4>
                      Why is this not yet out there? Why have people in this
                      field or that could be helped by it, not successfully
                      created it yet?
                    </h4>
                    <p>{assessment.explanation7}</p>
                    <h4>
                      Who would in your opinion be the ideal customers for this
                      idea?
                    </h4>
                    <p>{assessment.explanation8}</p>
                    <h4>
                      Can you think of a way to make this idea even better?
                    </h4>
                    <p>{assessment.explanation9}</p>
                    <h4>
                      Do you want to champion this idea by giving it a star?
                    </h4>
                    <p>
                      {assessment.isAgreementStarChecked
                        ? "Yes, I’d like to champion this idea because I believe it could be brilliant"
                        : "My feedback is sufficient, I don’t want to champion this idea"}
                    </p>
                    <h4>
                      Would you like to apply to become a mentor for this idea?
                    </h4>
                    <p>
                      {assessment.isAgreementMentorChecked
                        ? "Yes, I’d like to become a mentor for this idea"
                        : "No, thank you"}
                    </p>
                  </>
                )}
              </div>
            </div>
          </StyledCard>
        );
      })
    ) : (
      <StyledCard>
        <h4>There are currently no assessments for this idea</h4>
      </StyledCard>
    );

  return <>{renderAssessments} </>;
}

const StyledCard = styled(Card)`
  background-color: rgb(255, 255, 255, 0.3);
  padding-left: 8px;
  padding-right: 8px;
`;

const Content = styled.div`
  align-self: center;
  justify-self: center;
  color: #ffffff;
  width: 90vw;
  max-width: 800px;
  max-height: 2000px;
  height: auto;
  padding: 20px;
`;
