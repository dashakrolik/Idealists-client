/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SignupForm from './components/Signup/SignupForm';
import Dashboard from './components/Dashboard/Dashboard'
import Login from './components/Login/Login';
import UserFormContainer from "./components/UserFormContainer";
import { ThemeProvider } from 'emotion-theming';
import Playground from './components/Playground';
import FormScreen from './components/Questions/FormScreen';
import IdeaSubmissionLandingPage from './components/IdeaSubmission/IdeaSubmissionLandingPage';


class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Application>
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/signup' component={SignupForm} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/userform' component={UserFormContainer} />
            <Route exact path='/devPlayground' component={Playground} />
            <Route exact path='/formScreen' component={FormScreen} />
            <Route exact path='/ideaSubmission' component={IdeaSubmissionLandingPage} />
          </Application>
        </ThemeProvider>
      </Router>
    );
  }
}

const theme = {
  colors: {
    titleText: '#444444',
    accents: {
      primary: {
        dark: '#1A3D7C',
        light: '#4CC5F1',
      },
      secondary: {
        dark: '#233949',
        light: '#DFEFF2',
      },
    },
    bodyText: '#636363',
  },
};

const Application = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  color: ${props => props.theme.colors.bodyText};
`;

export default App;
