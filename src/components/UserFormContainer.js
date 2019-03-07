import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from '../constants'

export default function UserFormContainer() {
  const [groups, setGroups] = useState([]);
  const [index, setIndex] = useState(1);
  const [userFormState, setUserFormState] = useState({});

  // Hardcoded for now
  const maxIndex = 3

  useEffect(() => {
    request
      .get(`${baseUrl}/groups/${index}/questions`)
      .then(response => {
        setGroups(response.body);
      })
      .catch(err => {
        console.error(err)
      });
  }, [index]);

  const nextButton = () => {
    if (index < maxIndex)
    setIndex(index + 1)
  }

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
            onChange={handleChange} />
        </label>
      </div>
    );
  };

  if (groups) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          {groups.map(question => renderQuestion(question))}
          <button onClick={nextButton} type='submit'>Submit</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      Loading...
    </div>
  )
}

