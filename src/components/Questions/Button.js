/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import posed from 'react-pose';
import SplitText from 'react-pose-text';
import Lottie from 'react-lottie';
import { Textfit } from 'react-textfit';

const animationData = require('./checkmarksuccess');

const animationOptions = {
  loop: false,
  autoplay: false,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const charPoses = {
  init: { opacity: 0, x: -5 },
  enter: {
    opacity: 1,
    x: 0,
    delay: ({ charIndex }) => charIndex * 20,
  },
};

const Button = (props) => {
  
  const style = {
    height: props.height ? props.height : 40,
    isActive: !props.disabled,
    shouldShowIcon: !!props.withIcon,
    fontSize: props.fontSize ? props.fontSize : props.height ? Math.floor(props.height * 0.38).toString() : 16,
    iconSize: props.height ? (props.height - 4) : 36,
  };
  
  return (
    <ButtonContainer pose={style.isActive ? (style.shouldShowIcon ? 'activeWithIcon' : 'activeDefault') : 'disabled'}
                     {...style} css={props.css} onClick={props.onClick}>
      <Title css={css`margin: 0 20px; padding: 0; 
                      padding-left: ${(style.isActive && style.shouldShowIcon) ? '10' : '0'}px;
                      align-self: flex-start; width: 100%;`}>
        {
          style.state
          && <SplitText css={css`position: relative; width: auto; overflow: hidden; left: 4px;`}
                        initialPose='exit' pose={style.state ? 'enter' : 'exit'} charPoses={charPoses}>
            <Textfit mode='single' forceSingleModeWidth={true} max={style.fontSize}>{
              props.text
            }</Textfit>
          </SplitText>
        }
        {
          !style.state
          && <div
            css={css`position: relative; width: auto; overflow: hidden; left: 0;`}>
            <Textfit mode='single' forceSingleModeWidth={true} max={style.fontSize}>{
              props.disabledText
                ? props.disabledText
                : props.text
            }</Textfit>
          </div>
        }
      </Title>
      {
        style.shouldShowIcon
        && <div
          css={css`margin: auto 2px auto auto; padding: 0; align-self: flex-end; display: ${style.isActive ? 'inline' : 'none'};`}>
          <Lottie height={style.iconSize}
                  width={style.iconSize}
                  speed={1.6}
                  isStopped={false}
                  isPaused={!style.isActive}
                  options={animationOptions} />
        </div>
      }
    </ButtonContainer>
  );
};

const Title = posed.div({
  isActive: {
    x: 0,
    transition: {
      default: { type: 'spring', stiffness: 1000, damping: 30 },
    },
  },
  disabled: {
    x: 0,
    transition: {
      default: { type: 'spring', stiffness: 1000, damping: 30 },
    },
  },
});

const PFormButton = posed.div({
  hoverable: true,
  init: {
    scale: 0.9,
    originX: '50%',
    originY: '50%',
    transition: {
      scale: { type: 'spring', stiffness: 1000, damping: 30 },
    },
  },
  hover: {
    scale: 1.05,
    originX: '50%',
    originY: '50%',
    transition: {
      scale: { type: 'spring', stiffness: 1000, damping: 30 },
    },
  },
  activeWithIcon: {
    opacity: 1.0,
    scale: 1.0,
    originX: '50%',
    originY: '50%',
    borderColor: '#22ff22',
    color: '#22ff22',
    transition: {
      ease: 'easeInOut',
      duration: 100,
    },
  },
  activeDefault: {
    opacity: 1.0,
    scale: 1.0,
    originX: '50%',
    originY: '50%',
    borderColor: '#ffffff',
    color: '#ffffff',
    transition: {
      ease: 'easeInOut',
      duration: 100,
    },
  },
  disabled: {
    opacity: 0.45,
    scale: 0.95,
    originX: '50%',
    originY: '50%',
    borderColor: '#ffffff',
    color: '#ffffff',
    transition: {
      ease: 'easeInOut',
      duration: 100,
    },
  },
});

const ButtonContainer = styled(PFormButton)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  height: ${(props) => `${props.height}px`}; 
  font-size: ${(props) => `${props.fontSize}px`}; 
  line-height: ${(props) => `${props.height}px`}; 
  color: #22ff22;
  border: 1px solid #22ff22;
  border-radius: ${(props) => `${props.height}px`}; 
  outline: none;
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  margin: 5px;
`;

export default Button;