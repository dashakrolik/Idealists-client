import React from 'react';
import styled from '@emotion/styled';
import SingleLineQuestion from './Questions/SingleLineQuestion';
import SingleChoiceQuestion from './Questions/SingleChoiceQuestion';
import QuestionGroup from './Questions/QuestionGroup';

const Playground = () => {
  return (
    <Container>
      <Content>
        <QuestionGroup />
      </Content>
    </Container>
  );
};

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

export default Playground;