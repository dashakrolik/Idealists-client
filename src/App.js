/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import InvestorDashboard from './components/InvestorsPortal/Dashboard/InvestorDashboard';
import InvestorLogin from './components/InvestorsPortal/InvestorLogin';
import { ThemeProvider } from 'emotion-theming';
import IdeaStart from './components/MyIdea/IdeaStart';
import Submission from './components/MyIdea/IdeaSubmission/Submission';
import { baseUrl } from './constants';
import request from 'superagent';
import IdeaDashboard from './components/MyIdea/Dashboard/IdeaDashboard';
import IdeaLogin from './components/MyIdea/IdeaLogin';

class App extends Component {
  
  state = {
    auth: {
      loggedIn: false,
      token: '',
      user: '',
    },
  };
  
  logout = () => {
    this.setState({
      auth: {
        loggedIn: false,
        token: '',
        user: '',
      },
    });
  };
  
  requestLogin = (email, password) => {
    request
      .post(`${baseUrl}/login`)
      .send({ email, password })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: true,
              token: res.body.jwt,
            },
          });
        }
      })
      .catch(err => {
        if (err.status === 400) {
          // dispatch(userLoginFailed(err.response.body.message))
        } else {
          console.error(err);
        }
      });
  };

  getCurrentUser = () => {
    request
      .get(`${baseUrl}/current`)
      .set("Authorization", `Bearer ${this.state.auth.token}`)
      .then(res => {
        this.setState({...this.state, auth: {
          ...this.state.auth,
          user: res.body
        }})
      })
  }
  
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Application>
            <Route exact path='/Investors/dashboard' render={(props) => {
              return <InvestorDashboard {...props} authState={this.state.auth} login={this.requestLogin} />;
            }} />
            <Route exact path='/Investors/login' render={(props) => {
              return <InvestorLogin {...props} authState={this.state.auth} login={this.requestLogin} />;
            }} />
            <Route exact path='/MyIdea' render={(props) => {
              return <IdeaStart {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser}/>;
            }} />
            <Route exact path='/MyIdea/dashboard' render={(props) => {
              return <IdeaDashboard {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser}/>;
            }} />
            <Route exact path='/MyIdea/login' render={(props) => {
              return <IdeaLogin {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser}/>;
            }} />
            <Route exact path='/MyIdea/new' render={(props) => {
              return <Submission {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser}/>;
            }} />
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
