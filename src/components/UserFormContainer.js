import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import request from "superagent";

export default function UserFormContainer() {
  const [groups, setGroups] = useState(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    console.log("hey");
  }, []);
  // //request questions JSON to the server
  request
  .get(`${baseUrl}/questions`)
  .then(response => {setGroups(response.body)})
  .catch(err => {
          // if (err.status === 400) {
          //     dispatch(userSignupFailed(err.response.body.message))
          // }
          // else {
              console.error(err)}))

  const nextQuestionGroup = _ => {
    // let questionsGroups = response.body.questionsGroups[0]
    setIndex(index + 1);
  };

  // const questions = response.body.questionsGroups[0].questions
  return (
    <div>
      <UserForm questions={groups[index]} />

      <button onClick={nextQuestionGroup}>Next</button>
    </div>
  );
}

// JSON questions example
// {
//     "questionsVersion": "1.0",
//     "questionGroups": [
//       {
//         "questionGroupId": "1",
//         "questions": [
//           {
//             "questionId": "123456",
//             "questionType:": "regularTextField",
//             "questionText": "First name",
//             "questionHint": "Your first name",
//             "minChar": "0",
//             "maxChar": "120",
//             "validateAs": "name",
//             "isRequired": "true",
//             "errorMessage": "That's not a name."
//           },
//           {
//             "questionId": "123456",
//             "questionType:": "regularTextField",
//             "questionText": "First name",
//             "questionHint": "Your first name",
//             "minChar": "0",
//             "maxChar": "120",
//             "validateAs": "name",
//             "isRequired": "true",
//             "errorMessage": "That's not a name."
//           }
//         ]
//       },
//       {
//         "questionGroupId": "2",
//         "questions": [
//           {
//             "questionId": "123456",
//             "questionType:": "regularTextField",
//             "questionText": "First name",
//             "questionHint": "Your first name",
//             "minChar": "0",
//             "maxChar": "120",
//             "validateAs": "name",
//             "isRequired": "true",
//             "errorMessage": "That's not a name."
//           },
//           {
//             "questionId": "123456",
//             "questionType:": "regularTextField",
//             "questionText": "First name",
//             "questionHint": "Your first name",
//             "minChar": "0",
//             "maxChar": "120",
//             "validateAs": "name",
//             "isRequired": "true",
//             "errorMessage": "That's not a name."
//           }
//         ]
//       }
//     ]
//   }
