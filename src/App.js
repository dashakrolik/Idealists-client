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
import IdeaLogin from './components/MyIdea/IdeaLogin';
import TopBar from './components/NavBar/TopBar'
import ResetPassword from './components/MyIdea/ResetPassword';
import EnterNewPassword from './components/MyIdea/EnterNewPassword';

class App extends Component {
  state = {
    auth: {
      loggedIn: false,
      token: '',
      user: '',
    },
    navigation: {
      activePath: '',
    }
  };
  
  logout = () => {
    this.setState({
      auth: {
        loggedIn: false,
        token: '',
        user: '',
      },
      navigation: {
        activePath: ''
      }
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

  resetPassword = (email) => {
    request
      .post(`${baseUrl}/reset-password`)
      .send( {email} )
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
      .send( {password })
      .then(res => res.status === 200)
  }

  render() {
    return (
      <Router>
        <div>
          <TopBar authState={this.state.auth} user={this.getCurrentUser} logout={this.logout} resetPassword={this.resetPassword} updatePassword={this.updatePassword}/>
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
                  return <IdeaLogin {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} resetPassword={this.resetPassword} updatePassword={this.updatePassword}/>;
                }} />
                <Route exact path='/MyIdea/new' render={(props) => {
                  return <Submission {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser}/>;
                }} />

                <Route exact path='/MyIdea/login/reset-password' render={(props) => {
                  return <ResetPassword {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} resetPassword={this.resetPassword} updatePassword={this.updatePassword}/>;
                }} />
                <Route exact path='/reset-password/:jwt' render={(props) => {
                  return <EnterNewPassword {...props} authState={this.state.auth} login={this.requestLogin} user={this.getCurrentUser} resetPassword={this.resetPassword} updatePassword={this.updatePassword}/>;
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
