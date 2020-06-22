import React from "react";
import * as jsPDF from "jspdf";
import { withRouter } from "react-router-dom";
import Button from "../../../reogranisation/Questions/Button";

const CommentsPDFCreator = (props) => {
  const { comments, user, idea, printer, ideaId } = props;

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

  function renderCommenter(user, date) {
    if (user.role !== "specialist")
      return `By: ${user.firstName} ${user.lastName}
          ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}    
          Date: ${date.toUTCString()}`;
    if (user.role === "specialist")
      return `By: ${user.firstName} ${user.lastName}
          ${
            user.specialistType.charAt(0).toUpperCase() +
            user.specialistType.slice(1)
          } Specialist 
          Date: ${date.toUTCString()}`;
  }

  let commentsText = comments.map((comm) => {
    let { user, comment, createdAt, id } = comm;
    let date = new Date(createdAt);
    return `
    Comment 
        Comment ID: ${id}
        ${renderCommenter(user, date)}

        ${comment.title}
            ${comment.message}`;
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

    Comments:
        ${commentsText}

    

  `;
  };

  const header = `Specialist Comments for Idea ${qAnswers[5]}`;

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
    doc.save(`Comments_for_Idea_${ideaId}.pdf`);
  };

  const download = () => {
    downloadPDF();
  };

  return (
    <Button
      color="inherit"
      text="Download Comments as PDF"
      onClick={() => download()}
    />
  );
};

export default withRouter(CommentsPDFCreator);
