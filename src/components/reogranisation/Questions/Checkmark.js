/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import Lottie from 'react-lottie';

const animationData = require('./checkmarksuccess');

const Checkmark = (props) => {
  
  const [show, setShow] = useState(true);
  
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  
  return (
    <div>
      <Lottie options={defaultOptions}
              height={props.width ? props.width : 36}
              width={props.width ? props.width : 36}
              speed={1.6}
              isStopped={false}
              isPaused={!props.show} />
    </div>
  );
};

export default Checkmark;