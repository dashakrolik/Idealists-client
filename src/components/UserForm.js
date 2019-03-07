import React, { useState, useEffect } from "react";

export default function UserForm(questions) {
  const [userFormState, setUserFormState] = useState({});
  const questionsReceived = questions.questions

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(userFormState);
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setUserFormState({
      ...userFormState,
      [name]: value
    });
  };

  const onSubmit = data => {
    console.log(data);
    // setUserFormState()
  };

  const renderQuestion = question => {
    return (
      <div key={question.id}>
        <label>
          {question.question}
          <input
            type={question.questionText}
            name={question.id}
            value={userFormState.email || ""}
            onChange={handleChange}
          />
        </label>
      </div>
    );
  };

  useEffect(() => {
    // console.log(questionsReceived)
  })

  return (

    <div>
      {questionsReceived.map(question => renderQuestion(question))}
      Hello!
    </div>
  );
}
