/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import styled from '@emotion/styled';
import posed from 'react-pose';

const TagSelect = (props) => {
  return (
    <Container>
      <TagsContainer>
        <Tag>Random Tag</Tag>
        <Tag>Random Tag</Tag>
        <Tag>Random Tag</Tag>
        <Tag>Random Tag</Tag>
        <Tag>Random Tag</Tag>
      </TagsContainer>
    </Container>
  );
};

const PTag = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    opacity: 0.9,
    y: 0,
    backgroundColor: '#ffffff',
    transition: { ease: 'easeInOut', duration: 120 },
  },
  hover: {
    opacity: 1.0,
    y: 0,
    backgroundColor: '#aaccff',
    transition: { ease: 'easeInOut', duration: 120 },
  },
});

const Tag = styled(PTag)`
  width: auto;
  //box-sizing:border-box;
  display: inline-block;
  margin: 2px 2px;
  font-size: 10px;
  line-height: 14px;
  height: 14px;
  padding: 1px 10px;
  color: #252525;
  background-color: #ffffff;
  border-radius: 14px;
  flex-grow: 1;
  text-align: center;
  &:hover {
    cursor:pointer;
  }
`;

const poses = {
  tfDefault: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    color: '#252525',
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 200 },
  },
  tfFocused: {
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    color: '#252525',
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 120 },
  },
  tfError: {
    backgroundColor: 'rgba(255, 115, 141, 1.0)',
    color: '#ffffff',
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 200 },
  },
  tfFocusedError: {
    backgroundColor: 'rgba(255, 115, 141, 1.0)',
    color: '#ffffff',
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 200 },
  },
};

const PTagsContainer = posed.div(poses);

const TagsContainer = styled(PTagsContainer)`
  position: relative;
  box-sizing:border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  width: 90vw;
  max-width: 700px;
  height: 320px;
  line-height: 12px;
  font-size: 12px;
  border-radius: 6px;
  border-color: transparent;
  padding: 6px;
  outline: none;
  color: #252525;
  -webkit-appearance: none;
  resize: none;
`;

const PContainer = posed.div({
  default: {
    opacity: 0.69,
    y: 0,
    scale: 1.0,
    transition: { ease: 'easeInOut', duration: 120 },
  },
  focused: {
    opacity: 1.0,
    y: 0,
    scale: 1.02,
    transition: { ease: 'easeInOut', duration: 120 },
  },
});

const Container = styled(PContainer)`
  position: relative;
  top: 0;
  left: 0;
  margin: 5px;
  width: auto;
  height: auto;
  color: #ffffff;
`;


export default TagSelect;