import React, { useEffect, useState } from "react";
// import request from "superagent";
import UserForm from './UserForm'
import {data} from '../constants'

export default function UserFormContainer() {
  const [groups, setGroups] = useState([]);
  const [index, setIndex] = useState(0);
  
  // useEffect(() => {
  //   request
  //     .get(`http://localhost:3001/questions`)
  //     .then(response => {
  //       setGroups(response.body);
  //     })
  //     .catch(err => {
  //         console.error(err);
  //       },
  //     );
  // }, []);

  useEffect(() => {
    setGroups(data)
  })
  
  const nextQuestionGroup = _ => {
    console.log(index)
    setIndex(index + 1);
  };
  
  if (groups.questionGroups){
    return (    
      <div>
        <UserForm questions={groups.questionGroups[index].questions} />
        <button onClick={nextQuestionGroup}>Next</button>
      </div>
    );      
  }
  return (
    <div>
      Loading...
    </div>
  )
  
}

