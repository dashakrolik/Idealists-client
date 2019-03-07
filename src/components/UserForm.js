import React, { useState, useEffect } from "react";

export default function UserForm(questions) {
  const [userFormState, setUserFormState] = useState({});
  let questionsReceived = questions.questions

  // const handleSubmit = evt => {
  //   evt.preventDefault();
  //   onSubmit(userFormState);
  // };

  const handleChange = event => {
    const { name, value } = event.target;

    setUserFormState({
      ...userFormState,
      [name]: value
    });
  };

  // const onSubmit = data => {
  //   console.log(data);
  //   // setUserFormState()
  // };

  const renderQuestion = question => {
    return (
      <div key={question.questionId}>
        <label>
          {question.questionText}
          <input
            type={question.questionText}
            name={question.validateAs}
            value={userFormState.email || ""}
            onChange={handleChange}
          />
        </label>
      </div>
    );
  };

  useEffect(() => {
    console.log(questions)
  })

  return (

    <div>
      {questionsReceived.map(question => renderQuestion(question))}
    </div>
  );
}
