/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function IdeaLogin(props) {
  // console.log(localStorage)
  const [loginState, setLoginState] = useState({});
  
  // added this while debugging login issues
  const handleSubmitCallback = () => {
    console.log('Hi from callback')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(loginState);
    // e.preventDefault()
    // if (props.authState.loggedIn) {
    // triggerUserData()
    // } else if (props.authState.error === true) {
      
    //   alert('You have entered an incorrect email or password, please refresh the page and try again')
    //   e.preventDefault()
    // }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };
  
  const onSubmit = (data) => {
    const { email, password } = data;
    props.login(email, password, handleSubmitCallback);
  };

  const triggerUserData = () => {
    if (props.authState.loggedIn) {
    props.user(); console.log('line 34') 
    }
  }


  //logout code

  //logout code
  
  // console.log('line 47')
  // console.log(localStorage.currentUserJwt)

  // // this code breaks the login function
  // if (!localStorage.currentUserJwt) { console.log('line 48')
  //   props.history.replace('/MyIdea/login'); console.log('line 48')
  //   triggerUserData(); console.log('line 47')
    // return <div></div>;
  // }
  
  if (props.authState.loggedIn !== true) return (
    <Container>

      <LeftSide>
        <div>
          <h3>Login to My Idea Page</h3>

        </div>
      </LeftSide>
      <RightSide>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type='email' name='email' value={loginState.email || ''} onChange={handleChange} />
          <br />
          
          <label>Password</label>
          <input type='password' name='password' value={loginState.password || ''} onChange={handleChange} />
          <br />

          <button type='submit'>Login</button>
          <button type='submit' onClick={()=> {props.history.replace('/MyIdea/login/reset-password')}}>Forgot your password?</button>
        </form>
      </RightSide>
    </Container>);
  else return (<Redirect to='/' />)
}

const Logo = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin: -300px auto auto auto;
  height: 70px;
`;


const LeftSide = styled.div`
  position: absolute;
  color: #ffffff;
  top: 50%;
  left: 50%;
  width: 360px;
  height: 300px;
  margin-left: -360px;
  margin-top: -150px;
  padding-top: 10px;
  
  h3 {
    display: block;
    position: relative;
    left: 47px;
    width: 80%;
    font-size: 24px;
    font-weight: 500;
    padding: 5px;
    margin: 50px 5px 5px;
  }
  
   p {
    display: block;
    position: relative;
    left: 47px;
    top: 10px;
    width: 80%;
    font-size: 10px;
    font-weight: 300;
    padding: 5px;
    margin: 5px;
  }
  
  a {
    font-weight: 800;
    &:hover {
      cursor: pointer;
      color: #DFEFF2;
    }
  }
  
`;

const RightSide = styled.div`
  position: absolute;
  //color: #ffffff;
  top: 50%;
  left: 50%;
  width: 300px;
  height: auto;
  padding-top: 10px;
  padding-bottom: 20px;
  margin-left: 0px;
  margin-top: -150px;
  border-radius: 6px;
  box-shadow: 2px 2px 23px 0px rgba(37,37,37,0.39);;
  background-color: rgba(255, 255, 255, 0.9);
  color: #233949;
  
  label {
    display: block;
    position: relative;
    left: 10%;
    width: 80%;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #233949;
    padding: 0;
    margin: 0;
    border-radius: 10px;
    border-color: transparent;
    outline: none;
    -webkit-appearance: none;
  }
  
  input {
    display: block;
    position: relative;
    left: 10%;
    width: 80%;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #233949;
    border-radius: 6px;
    border-color: transparent;
    padding: 6px;
    outline: none;
    -webkit-appearance: none;
  }
  
  button {
    display: inline-block;
    position: relative;
    float: right;
    right: 10%;
    width: 40%;
    height: 60px;
    line-height: 30px;
    font-size: 12px;
    color: #233949;
    border-radius: 6px;
    border-color: transparent;
    outline: none;
    -webkit-appearance: none;
    background-color: #DFEFF2;
    transition: all 100ms ease-in-out;
    
    &:hover {
      color: white;
      background-color: #4CC5F1;
      cursor: pointer;
    }
  }
  
  a {
    display: inline-block;
    position: relative;
    float: left;
    left: 10%;
    margin-right: 5px;
    height: 30px;
    line-height: 30px;
    font-size: 10px;
    color: #233949;
    outline: none;
    -webkit-appearance: none;
    transition: all 100ms ease-in-out;
    
    &:hover {

      cursor: pointer;
      color: #1A3D7C;
    }
  }
  
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right top, #1a3d7c, #195d9c, #1f7fbb, #31a2d7, #4cc5f1);
`;