import React, { useEffect, useState } from "react";
import request from "superagent";

export default function UserFormContainer() {
  const [groups, setGroups] = useState([]);
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    request
      .get(`http://localhost:3001/questions`)
      .then(response => {
        setGroups(response.body);
      })
      .catch(err => {
          console.error(err);
        },
      );
  }, []);
  
  const nextQuestionGroup = _ => {
    setIndex(index + 1);
  };
  
  return (
    <div>
      {/*<UserForm questions={groups[index]} />*/}
      {/*<button onClick={nextQuestionGroup}>Next</button>*/}
    </div>
  );
}
