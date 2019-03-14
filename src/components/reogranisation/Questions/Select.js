/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

const Select = (props) => {
  return (
    <Container>
      <SelectContainer></SelectContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 36px; 
  width: 100%;
`;

const SelectContainer = styled.div`
  height: 36px; 
  width: 100%;
  border-radius: 6px;
  background-color: #ffffff;
`;

export default Select;