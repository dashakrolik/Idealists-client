import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from '../../constants';
import styled from '@emotion/styled';
import SingleLineQuestion from './Questions/SingleLineQuestion';
import { PoseGroup } from 'react-pose';
import posed from 'react-pose';


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
    if (index === maxIndex){
      
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event;

    setUserFormState({
      ...userFormState,
      [name]: value
    });
  };

  const onSubmit = data => {
    // console.log(data);
    // setUserFormState()
    // Post request here
  };

  const renderQuestion = question => {
    return (<SingleLineQuestion
        // type='answer'v
        name={question.id}
        key={question.id}
        value={userFormState[question.id] || ''}
        onChange={handleChange}
        questionTitle={question.question}
        validator={(val) => val.length < (Math.random() * 100)}
        errorMessage={`${Math.random() * 100} NONONONONONO`} />
    );
  };
  
  if (groups) {
    return (
      <Container>
        <Content>
          <PoseGroup animateOnMount={true} preEnterPose='initial'>
            <PFormContainer key={index.toString()}>
              <form onSubmit={handleSubmit}>
                {groups.map(question => renderQuestion(question))}
                <button onClick={nextButton} type='submit'>Submit</button>
              </form>
            </PFormContainer>
          </PoseGroup>
        </Content>
      </Container>
    );
  }
  return (
    <Container>
      <Content>
      Loading...
      </Content>
    </Container>
  )
}

const PFormContainer = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 },
    },
  },
  initial: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
});

const Content = styled.div`
  position: relative;
  width: 900px;
  height: 700px;
  top: 50%;
  left: 50%;
  margin: -350px auto auto -450px;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
`;
