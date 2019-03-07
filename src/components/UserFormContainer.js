import React, { useEffect, useState } from "react";
import request from "superagent";
import UserForm from './UserForm'
import { baseUrl } from '../constants'

export default function UserFormContainer() {
  const [groups, setGroups] = useState([]);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    // console.log(index)

    request
      .get(`${baseUrl}/groups/${index}/questions`)
      .then(response => {
        setGroups(response.body);
      })
      .catch(err => {
        console.error(err)
      });
  }, [index]);

  if (groups) {
    return (
      <div>
        <UserForm questions={groups} />
        <button onClick={() => { setIndex(index + 1) }}>Next</button>
      </div>
    );
  }
  return (
    <div>
      Loading...
    </div>
  )
}

