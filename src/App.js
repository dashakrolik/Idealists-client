/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import InvestorDashboard from './components/InvestorsPortal/Dashboard/InvestorDashboard';
import InvestorLogin from './components/InvestorsPortal/InvestorLogin';
import { ThemeProvider } from 'emotion-theming';
import IdeaStart from './components/MyIdea/IdeaStart';
import Submission from './components/MyIdea/IdeaSubmission/Submission';
import { baseUrl } from './constants';
import request from 'superagent';
import IdeaDashboard from './components/MyIdea/Dashboard/IdeaDashboard';
import IdeaDashboardDetail from './components/MyIdea/Dashboard/IdeaDashboardDetail';
import IdeaLogin from './components/MyIdea/IdeaLogin';
import TopBar from './components/NavBar/TopBar'
import ResetPassword from './components/MyIdea/ResetPassword';
import EnterNewPassword from './components/MyIdea/EnterNewPassword';
import AutoMatch from './components/MyIdea/Dashboard/AutoMatch'

import AssesIdeas from './components/InvestorsPortal/Dashboard/AssessIdeas'

import AutoMatchDetails from './components/MyIdea/Dashboard/AutoMatchDetails'


class App extends Component {
  state = {
    auth: {
      loggedIn: false,
      token: '',
      user: ''
    },
    navigation: {
      activePath: '',
    }
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
          localStorage.setItem('currentUserJwt', res.body.jwt)
        }
      })
      .catch(err => {
        if (err.status === 400) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null
            }
          })

          alert("You have entered an incorrect email or password, Please try again!")
          localStorage.setItem('currentUserJwt', null)
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
        this.setState({
          ...this.state, auth: {
            ...this.state.auth,
            loggedIn: true,
            user: res.body
          }

        })
        localStorage.setItem('currentUserJwt', this.state.auth.token)
        localStorage.setItem('user', this.state.auth.user)
      })
  }

  resetPassword = (email) => {
    request
      .post(`${baseUrl}/reset-password`)
      .send({ email })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null
            },
          });
        }
      })
  }

  updatePassword = (jwt, password) => {
    request
      .put(`${baseUrl}/users`)
      .set("Authorization", `Bearer ${jwt}`)
      .send({ password })
      .then(res => res.status === 200)
  }

  updateLocalStorage = (key, value) => {
    localStorage.setItem('User first name', this.state.auth.user.firstName)
    localStorage.setItem('User last name', this.state.auth.user.lastName)
    localStorage.setItem('User email', this.state.auth.user.email)
    localStorage.setItem('Current user', this.state.auth.user.email)

    let retrievedToken = localStorage.getItem('currentUserJwt')

    return retrievedToken
  }

  logout = () => {
    localStorage.clear();
    localStorage.removeItem('currentUserJwt')
    sessionStorage.clear()
    localStorage.setItem('currentUserJwt', null)
    this.setState({
      auth: {
        loggedIn: false,
        token: null,
        user: null
      }
    })
  }

  setAuthLoggedInTrue = () => {
    this.setState({
      auth: {
        loggedIn: true,
        token: localStorage.currentUserJwt,
        user: ''
      }
    })
  }

  render() {
    return (
      <Router>
        <div>
          <TopBar authState={this.state.auth} user={this.getCurrentUser} logout={this.logout} resetPassword={this.resetPassword} updatePassword={this.updatePassword} updateLocalStorage={this.updateLocalStorage} />
          <ThemeProvider theme={theme}>
            <Application>
              <Route exact path='/Investors/dashboard' render={(props) => {
                return <InvestorDashboard {...props} authState={this.state.auth} login={this.requestLogin} updateLocalStorage={this.updateLocalStorage} logout={this.logout} />;
              }} />
              <Route exact path='/Investors/dashboard/assess' render={(props) => {
                return <AssesIdeas {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} />;
              }} />
              <Route exact path='/Investors/login' render={(props) => {
                return <InvestorLogin {...props} authState={this.state.auth} login={this.requestLogin} updateLocalStorage={this.updateLocalStorage} logout={this.logout} setAuthLoggedInTrue={this.setAuthLoggedInTrue} />;
              }} />
              <Route exact path='/MyIdea' render={(props) => {
                return <IdeaStart {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} updateLocalStorage={this.updateLocalStorage} logout={this.logout} setAuthLoggedInTrue={this.setAuthLoggedInTrue} />;
              }} />
              <Route exact path='/MyIdea/dashboard' render={(props) => {
                return <IdeaDashboard {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} updateLocalStorage={this.updateLocalStorage} logout={this.logout} />;
              }} />
              <Route exact path='/dashboard/ideas/:id' render={(props) => {
                return <IdeaDashboardDetail {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} updateLocalStorage={this.updateLocalStorage} logout={this.logout} />;
              }} />
              <Route exact path='/MyIdea/login' render={(props) => {
                return <IdeaLogin {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} resetPassword={this.resetPassword} updatePassword={this.updatePassword} updateLocalStorage={this.updateLocalStorage} logout={this.logout} setAuthLoggedInTrue={this.setAuthLoggedInTrue} />;
              }} />
              <Route exact path='/MyIdea/new' render={(props) => {
                return <Submission {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} updateLocalStorage={this.updateLocalStorage} logout={this.logout} setAuthLoggedInTrue={this.setAuthLoggedInTrue} />;
              }} />
              <Route exact path='/MyIdea/login/reset-password' render={(props) => {
                return <ResetPassword {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} resetPassword={this.resetPassword} updatePassword={this.updatePassword} updateLocalStorage={this.updateLocalStorage} logout={this.logout} />;
              }} />
              <Route exact path='/reset-password/:jwt' render={(props) => {
                return <EnterNewPassword {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} resetPassword={this.resetPassword} updatePassword={this.updatePassword} updateLocalStorage={this.updateLocalStorage} logout={this.logout} />;
              }} />
              <Route exact path='/ideas/:id/automatch' render={(props) => {
                return <AutoMatch {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} resetPassword={this.resetPassword} updatePassword={this.updatePassword} />;
              }} />
              <Route exact path='/automatch/:patentNumber' render={(props) => {
                return <AutoMatchDetails {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} resetPassword={this.resetPassword} updatePassword={this.updatePassword} />;
              }} />
              <Route exact path="/" render={() => <Redirect to="/MyIdea" />} />
            </Application>
          </ThemeProvider>
        </div>
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
