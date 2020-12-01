/** @jsx jsx */
import React, { useState } from 'react'
import { jsx, css } from '@emotion/core';
import request from 'superagent'
// import { baseUrl } from '../../../constants';
import styled from '@emotion/styled';
//import Header from '../Start/Header';
import { Redirect } from 'react-router-dom'

export default function ProfileUpdateForm(props) {

  return (
      <Container>
        {/* <Header /> */}
        <FormContainer>
          <form>
            <label>
              First Name
            </label>
            <input type="text"/><br></br>
            <label>
              Last Name
            </label>
            <input type="text"/><br></br>
            <label>
              upload your profile video
            </label>
             <input type="file" id="myFile" name="filename"/><br></br>
             <a href="https://www.16personalities.com/nl">Take a personality test
             !</a><br></br>

             <input type="submit"/>
          </form>
        </FormContainer>
      </Container>
    );
  
}


const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 600px;
  margin-left: -200px;
  margin-top: -300px;
  background-color: rgba(220, 220, 220, 0.9);
`;

const Container = styled.div`
  // position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
`;