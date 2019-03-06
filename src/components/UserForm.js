import React, { useState } from "react";

export default function UserForm(questions) {
  const [userFormState, setUserFormState] = useState({});

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

        {/* <label>
          {question.questionText}
          <input
            type="{question.questionText}"
            name="firstName"
            value={userFormState.firstName || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          {question.questionText}
          <input
            type="{question.questionText}"
            name="lastName"
            value={userFormState.lastName || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          {question.questionText}
          <input
            type="{question.questionText}"
            name="password"
            value={userFormState.password || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          {question.questionText}
          <input
            type="{question.questionText}"
            name="confirmPassword"
            value={userFormState.confirmPassword || ""}
            onChange={handleChange}
          />
        </label> */}
        {/* // {
   //     formState.password &&
   //     formState.confirmPassword &&
   //     formState.password !== formState.confirmPassword &&
   //     <p style={{ color: 'red' }}>The passwords do not match!</p>
   // } */}
      </div>
    );
  };
  
  return (<div></div>);
}
