import React from "react";
import * as jsPDF from "jspdf";
import { withRouter } from "react-router-dom";
import Button from "../../../reogranisation/Questions/Button";

const AssessmentsPDFCreator = (props) => {
  const { assessments, user, idea, printer, ideaId } = props;

  const processTitle = (title) => {
    let splitTitle = title.split("?");
    const processedTitle = splitTitle[0];
    return processedTitle;
  };

  let qAnswers = [];
  const qTitles = [];

  idea.map((idea) => {
    idea.answers.map((question) => {
      if (question.qTitle.length > 50) {
        const title = processTitle(question.qTitle);
        qTitles.push(title);
      } else {
        qTitles.push(question.qTitle);
      }
    });
  });

  idea.map((idea) => {
    idea.answers.map((answer) => {
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

  var QandA = [];
  for (var i = 0, length = qAnswers.length; i < length; i++) {
    QandA.push(
      `

${qTitles[i]}
      ${qAnswers[i]}`
    );
  }

  function renderAssessor(user, date) {
    if (!user.industry && user.role !== "specialist")
      return `By: ${user.firstName} ${user.lastName}
          ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}    
          Date: ${date.toUTCString()}`;
    if (user.role === "specialist")
      return `By: ${user.firstName} ${user.lastName}
          ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          ${
            user.specialistType.charAt(0).toUpperCase() +
            user.specialistType.slice(1)
          } Specialist 
          Date: ${date.toUTCString()}`;
    if (user.industry >= 1) {
      let indu = user.industry.map((indu) => `${indu} `);
      return `By: ${user.firstName} ${user.lastName}
          ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          ${indu}    
          Date: ${date.toUTCString()}`;
    }
  }

  let assessmentsText = assessments.map((assessm) => {
    let { user, assessment } = assessm;
    let date = new Date(assessm.createdAt);
    return `
        Assessment 
        Assessment id: ${assessm.id}
        Assessment weight: ${assessm.weight}
        ${renderAssessor(user, date)}

        Will people want this?
            ${assessment.willPeopleWantThis}/10
            ${assessment.explanation}

        Does this solve a problem people currently have?
            ${assessment.doesThisSolveProblem}/10
            ${assessment.explanation2}

        Is it, in your opinion, a good idea?
            ${assessment.isItAGoodIdea}/10
            ${assessment.explanation4}
          
        Is it the right timing for this idea?
            ${assessment.isThisTheRightTiming}/10
            ${assessment.explanation3}
          
        ${
          assessment.proReason1 === "" && assessment.explanation5 === ""
            ? ``
            : ` Imagine you’re an advocate for this idea. Name up to 5 reasons why you would be so ‘pro’ this idea
            1. ${assessment.proReason1}
            2. ${assessment.proReason2}
            3. ${assessment.proReason3}
            4. ${assessment.proReason4}
            5. ${assessment.proReason5}
               
        Imagine you’re an opponent of this idea. Name up to 5 reasons why you would be so ‘against’ this idea:
            1. ${assessment.againstReason1}
            2. ${assessment.againstReason2}
            3. ${assessment.againstReason3}
            4. ${assessment.againstReason4}
            5. ${assessment.againstReason5}
               
        What do you expect as time to impact for this idea?
              ${assessment.whatDoYouExpectAsTimeImpact}/10
              ${assessment.explanation5}
              
        What do you expect as magnitude of impact for this idea?
              ${assessment.whatDoYouExpectAsMagnitude}/10
              ${assessment.explanation6}
              
               
        Why is this not yet out there? Why have people in this field or that could be helped by it, not successfully created it yet?
              ${assessment.explanation7}
               
        Who would in your opinion be the ideal customers for this idea?
              ${assessment.explanation8}
        
        Can you think of a way to make this idea even better?
              ${assessment.explanation9}
               
        Do you want to champion this idea by giving it a star?
           ${
             assessment.isAgreementStarChecked
               ? "Yes, I’d like to champion this idea because I believe it could be brilliant"
               : "My feedback is sufficient, I don’t want to champion this idea"
           }
        
        Would you like to apply to become a mentor for this idea?
           ${
             assessment.isAgreementMentorChecked
               ? "Yes, I’d like to become a mentor for this idea"
               : "No, thank you"
           }`
        }
        `;
  });

  let pdfDownload = () => {
    return `
    Idea submitted by: 
        Name: ${user.firstName} ${user.lastName}
        E-mail: ${user.email}
        User ID: ${user.id}
        Idea ID: ${ideaId}
  
    This document was created by: 
        Name: ${printer.firstName} ${printer.lastName} 
        E-mail: ${printer.email}
        Role: ${printer.role}
        Type: ${printer.specialistType}

    Idea Description:
        ${qAnswers[6]}

    Assessments:
        ${assessmentsText}

    

  `;
  };

  const header = `Assessments for Idea ${qAnswers[5]}`;

  const downloadPDF = () => {
    let doc = new jsPDF();
    doc.setFontStyle("bold");
    doc.setFontSize(22);
    doc.text(header, 20, 20);

    var bodyContent = doc.splitTextToSize(pdfDownload(), 300);

    doc.setFontStyle("normal");
    doc.setFontSize(14);

    var y = 30;
    for (var i = 0; i < bodyContent.length; i++) {
      if (y > 280) {
        y = 20;
        doc.addPage();
      }
      doc.text(20, y, bodyContent[i]);
      y = y + 7;
    }
    doc.save(`Assessments_for_Idea_${ideaId}.pdf`);
  };

  const download = () => {
    downloadPDF();
  };

  return (
    <Button
      color="inherit"
      text="Download Assessments as PDF"
      onClick={() => download()}
    />
  );
};

export default withRouter(AssessmentsPDFCreator);
