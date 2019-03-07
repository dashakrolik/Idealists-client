/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import logo from '../res/logo_horizontal.png';

const Header = () => {
  return (
    <Container>
      <Logo src={logo} alt='Logo' />
    </Container>
  );
};

const Logo = styled.img`
  position: relative;
  left: 30px;
  top: 10px;
  height: 40px;
`;

const Container = styled.div`
  width: 100%;
  height: 60px;
  position:absolute;
  top: 0;
  bottom: 0;
`;

export default Header;