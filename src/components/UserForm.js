import React, { useState, useEffect } from "react";

export default function UserForm(questions) {
  const [userFormState, setUserFormState] = useState({});
  const questionsReceived = questions.questions

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userFormState);
  };

  const handleChange = (event) => {    
    const { name, value } = event.target;

    setUserFormState({
      ...userFormState,
      [name]: value
    });
  };

  const onSubmit = data => {
    console.log(data);
    // setUserFormState()
    // Post request here
  };

  const renderQuestion = question => {
    return (
      <div key={question.id}>
        <label>
          {question.question}
          <input
            type='answer'
            name={question.id}
            value={userFormState[question.id] || ''}
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
      <form onSubmit={handleSubmit}>
        {questionsReceived.map(question => renderQuestion(question))}
        <button type='submit'>Submit</button>
      </form>
    </div>

  );
}
