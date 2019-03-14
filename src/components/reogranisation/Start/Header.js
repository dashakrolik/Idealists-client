/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import logo from '../../../res/logo_horizontal_white.png';

const Header = (props) => {
  return (
    <Container>
      <div css={css`margin: 10px auto auto 30px;`}>
        <Logo src={logo} alt='Logo' />
      </div>
      <div css={css`margin: auto 50px auto auto; height: 60px; line-height: 60px;`}>
        <h2 css={css`color: #ffffff; font-weight: 400;`}>{props.title}</h2>
      </div>
    </Container>
  );
};

const Logo = styled.img`
  position: relative;
  left: 30px;
  top: 10px;
  height: 60px;
`;

const Container = styled.div`
  width: 100%;
  height: 60px;
  position:absolute;
  display: flex;
  justify-content: space-between;
  top: 0;
  bottom: 0;
`;

export default Header;