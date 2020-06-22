import React from "react";
import * as jsPDF from "jspdf";
import { withRouter } from "react-router-dom";
import Button from "../../../reogranisation/Questions/Button";

const IdeaPDFCreator = (props) => {
  const { idea, user, printer } = props;

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

  let pdfDownload = () => {
    return `
    Idea submitted by: 
        Name: ${user.firstName} ${user.lastName}
        E-mail: ${user.email}
        User ID: ${user.id}
        Idea ID: ${props.ideaId}
  
    This document was created by: 
        Name: ${printer.firstName} ${printer.lastName} 
        E-mail: ${printer.email}
        Role: ${printer.role}
        Type: ${printer.specialistType}
    ${QandA.map((qanda) => `${qanda}`)}

  `;
  };

  const header = `Idea ${qAnswers[5]}`;

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
    doc.save(`Idea_${props.ideaId}.pdf`);
  };

  const download = () => {
    downloadPDF();
  };

  return (
    <Button
      color="inherit"
      text="Download Idea as PDF"
      onClick={() => download()}
    />
  );
};

export default withRouter(IdeaPDFCreator);
