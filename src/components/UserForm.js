import React, { useState } from "react";

export default function UserForm(questions) {
  const [userFormState, setUserFormState] = useState({});

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(userFormState);
  };

  const handleChange = x => {
    const { name, value } = x.target;

    setUserFormState({
      ...userFormState,
      [name]: value
    });
  };

  const onSubmit = data => {
    console.log(data);
    // setUserFormState()
  };

  const questionrenderQuestionsList = question => {
    return (
      <div>
        <label>
          {question.questionText}
          <input
            type="{question.questionText}"
            name="email"
            value={userFormState.email || ""}
            onChange={handleChange}
          />
        </label>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map(q => questionrenderQuestionsList(q))}
      <input type="submit" value="Submit" />
    </form>
  );
}
