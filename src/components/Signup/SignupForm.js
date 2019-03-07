/** @jsx jsx */
import React, { useState } from 'react'
import { jsx, css } from '@emotion/core';
import request from 'superagent'
import { baseUrl } from '../../constants'
import styled from '@emotion/styled';

export default function SignupForm(props) {
  
  const [formState, setFormState] = useState({});
  
  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formState);
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  
  
  // Do we still use dispatch?
  const submitForm = (data) => (dispatch) => {
      const { firstName, lastName, email, password } = data
  
      request
          .post(`${baseUrl}/users`)
          .send({ firstName, lastName, email, password })
          .then(result => {
              // dispatch(userSignupSuccess())
          })
          .catch(err => {
              if (err.status === 400) {
                  // dispatch(userSignupFailed(err.response.body.message))
              }
              else {
                  console.error(err)
              }
          })
        }
  
  
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type='email' name='email' value={
            formState.email || ''
          } onChange={handleChange} />
        </label><br />
        
        <label>
          First Name
          <input type='firstName' name='firstName' value={
            formState.firstName || ''
          } onChange={handleChange} />
        </label><br />
        
        <label>
          Last Name
          <input type='lastName' name='lastName' value={
            formState.lastName || ''
          } onChange={handleChange} />
        </label><br />
        
        <label>
          Password
          <input type='password' name='password' value={
            formState.password || ''
          } onChange={handleChange} />
        </label><br />
        
        <label>
          Confirm password
          <input type='password' name='confirmPassword' value={
            formState.confirmPassword || ''
          } onChange={handleChange} />
        </label><br />
        
        {
          formState.password &&
          formState.confirmPassword &&
          formState.password !== formState.confirmPassword &&
          <p style={{ color: 'red' }}>The passwords do not match!</p>
        }
        
        <button type='submit'>Sign up</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;