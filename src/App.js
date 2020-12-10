/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import InvestorDashboard from "./components/InvestorsPortal/Dashboard/InvestorDashboard";
import InvestorLogin from "./components/InvestorsPortal/InvestorLogin";
import SpecialistDashboard from "./components/SpecialistPortal/Dashboard/SpecialistDashboard";
import SpecialistLogin from "./components/SpecialistPortal/SpecialistLogin";
import SpecialistIdeaDetails from "./components/SpecialistPortal/Dashboard/SpecialistIdeaDetails";
import { ThemeProvider } from "emotion-theming";
import IdeaStart from "./components/MyIdea/IdeaStart";
import Submission from "./components/MyIdea/IdeaSubmission/Submission";
import { baseUrl } from "./constants";
import request from "superagent";
import IdeaDashboard from "./components/MyIdea/Dashboard/IdeaDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminDashboardDetail from "./components/Admin/AdminDashboardDetail";
import AdminDashboardCofounders from "./components/Admin/AdminDashboardCofounders";
import IdeaDashboardDetail from "./components/MyIdea/Dashboard/IdeaDashboardDetail";
import IdeaLogin from "./components/MyIdea/IdeaLogin";
import TopBar from "./components/NavBar/TopBar";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import EnterNewPassword from "./components/ResetPassword/EnterNewPassword";
import AutoMatch from "./components/MyIdea/Dashboard/AutoMatch";
import InvestorStart from "./components/MyIdea/InvestorStart";
import SpecialistStart from "./components/MyIdea/SpecialistStart";
import AssesIdeas from "./components/InvestorsPortal/Dashboard/AssessIdeas";
import MyInvestments from "./components/InvestorsPortal/Dashboard/MyInvestments";
import Crowdfunding from "./components/InvestorsPortal/Dashboard/Crowdfunding";
import MyMentorships from "./components/InvestorsPortal/Dashboard/MyMentorships";
import AutoMatchDetails from "./components/MyIdea/Dashboard/AutoMatchDetails";
import FormAssessIdeas from "./components/InvestorsPortal/Dashboard/FormAssessIdeas";
import InvestorIdeaDetails from "./components/InvestorsPortal/Dashboard/InvestorIdeaDetails";
import AdminDashboardRejected from "./components/Admin/AdminDashboardRejected";
import CompleteAssessment from "./components/InvestorsPortal/Dashboard/CompleteAssessment";
import AddSpecialistStart from "./components/SpecialistPortal/SpecialistCreation/AddSpecialistStart";
import UserAssessIdeas from "./components/MyIdea/Dashboard/UserAssessIdeas";
import CofounderStart from "./components/Cofounder/CofounderStart";
import CofounderLogin from "./components/Cofounder/CofounderLogin";
import CofounderDashboard from "./components/Cofounder/CofounderDashboard";
import CofounderProfile from "./components/Cofounder/CofounderProfile";
import IdeasList from "./components/Cofounder/IdeaList";
import CofounderPersonalityTest from "./components/Cofounder/CofounderPersonalityTest";
import CofounderProfileVideo from "./components/Cofounder/CofounderProfileVideo";

import Spinner from "./components/reogranisation/Spinner";

class App extends Component {
  state = {
    auth: {
      loggedIn: false,
      token: "",
      user: "",
    },
    navigation: {
      activePath: "",
    },

    loading: true,
  };

  rejectIdea = (rejected, ideasId) => {
    request
      .put(`${baseUrl}/ideas/${ideasId}/progress`)
      .set("Authorization", `Bearer ${this.state.auth.token}`)
      .send(rejected)
      .then((res) => {
        if (res.status === 200) {
          console.log("idea rejection request successful");
        }
      })
      .catch((err) => {
        if (err) {
          console.log("error", err);
        }
      });
  };

  requestLoginUser = (email, password) => {
    request
      .post(`${baseUrl}/loginUser`)
      .send({ email, password })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: true,
              token: res.body.jwt,
            },
            loading: false,
          });
          localStorage.setItem("currentUserJwt", res.body.jwt);
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null,
              loading: false,
            },
          });

          alert(
            "You have entered an incorrect email. If you do not have an account, Please signup!"
          );
          localStorage.setItem("currentUserJwt", null);
        } else if (err.status === 401) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null,
              loading: false,
            },
          });

          alert("You have entered an incorrect password, Please try again!");
          localStorage.setItem("currentUserJwt", null);
        } else if (err.status === 403) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null,
              loading: false,
            },
          });

          alert("As an Expert, Please use Expert Login!");

          localStorage.setItem("currentUserJwt", null);
        } else {
          console.error(err);
        }
      });
  };

  requestLoginExpert = (email, password) => {
    request
      .post(`${baseUrl}/loginExpert`)
      .send({ email, password })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: true,
              token: res.body.jwt,
            },
          });
          localStorage.setItem("currentUserJwt", res.body.jwt);
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null,
            },
          });

          alert(
            "You have entered an incorrect email. If you do not have an account, Please signup!"
          );
          localStorage.setItem("currentUserJwt", null);
        } else if (err.status === 401) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null,
            },
          });

          alert("You have entered an incorrect password, Please try again!");
          localStorage.setItem("currentUserJwt", null);
        } else if (err.status === 403) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null,
            },
          });

          alert(
            "This login is for Experts only, Please use User Login as an Idea Owner or Specialist Login as a Specialist!"
          );
          localStorage.setItem("currentUserJwt", null);
        } else {
          console.error(err);
        }
      });
  };

  requestLoginSpecialist = (email, password) => {
    request
      .post(`${baseUrl}/loginSpecialist`)
      .send({ email, password })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: true,
              token: res.body.jwt,
            },
          });
          localStorage.setItem("currentUserJwt", res.body.jwt);
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null,
            },
          });

          alert(
            "You have entered an incorrect email. If you do not have an account, Please contact the admin!"
          );
          localStorage.setItem("currentUserJwt", null);
        } else if (err.status === 401) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null,
            },
          });

          alert("You have entered an incorrect password, Please try again!");
          localStorage.setItem("currentUserJwt", null);
        } else if (err.status === 403) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null,
            },
          });

          alert(
            "This login is for Specialists only, Please use User Login as an Idea Owner or Expert Login as an Expert!"
          );

          localStorage.setItem("currentUserJwt", null);
        } else {
          console.error(err);
        }
      });
  };

  getCurrentUser = () => {
    request
      .get(`${baseUrl}/current`)
      .set("Authorization", `Bearer ${this.state.auth.token}`)
      .then((res) => {
        this.setState({
          ...this.state,
          auth: {
            ...this.state.auth,
            loggedIn: true,
            user: res.body,
          },

          loading: true,
        });
        localStorage.setItem("currentUserJwt", this.state.auth.token);
        localStorage.setItem("user", this.state.auth.user);
      });
  };

  sendAssessment = (content) => {
    request
      .post(`${baseUrl}/assessments`)
      .set("Authorization", `Bearer ${this.state.auth.token}`)
      .send({ content })
      .then((res) => {
        res.status === 200 && console.log("form sent");
      });
  };

  sendInput = (content) => {
    request
      .post(`${baseUrl}/input`)
      .set("Authorization", `Bearer ${this.state.auth.token}`)
      .send({ content })
      .then((res) => {
        res.status === 200 && console.log("form sent");
      });
  };

  resetPassword = (email) => {
    const clientUrl = window.location.origin;
    request
      .post(`${baseUrl}/reset-password`)
      .send({ email, clientUrl })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            ...this.state,
            auth: {
              ...this.state.auth,
              loggedIn: false,
              token: null,
            },
          });
        }
      });
  };

  updatePassword = (jwt, password) => {
    request
      .put(`${baseUrl}/reset-password`)
      .send({ jwt, password })
      .then((res) => res.status === 200)
      .catch((err) => {
        alert("Something went wrong, please try again.");
      });
  };

  updateLocalStorage = (key, value) => {
    localStorage.setItem("User first name", this.state.auth.user.firstName);
    localStorage.setItem("User last name", this.state.auth.user.lastName);
    localStorage.setItem("User email", this.state.auth.user.email);
    localStorage.setItem("Current user", this.state.auth.user.email);

    let retrievedToken = localStorage.getItem("currentUserJwt");

    return retrievedToken;
  };

  logout = () => {
    localStorage.clear();
    localStorage.removeItem("currentUserJwt");
    sessionStorage.clear();
    localStorage.setItem("currentUserJwt", null);
    this.setState({
      auth: {
        loggedIn: false,
        token: null,
        user: null,
      },
      loading: true,
    });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  setAuthLoggedInTrue = () => {
    this.setState({
      auth: {
        loggedIn: true,
        token: localStorage.currentUserJwt,
        user: "",
      },
    });
  };

  render() {
    return (
      <Router>
        <div>
          <TopBar
            authState={this.state.auth}
            user={this.getCurrentUser}
            logout={this.logout}
            resetPassword={this.resetPassword}
            updatePassword={this.updatePassword}
            updateLocalStorage={this.updateLocalStorage}
          />
          <ThemeProvider theme={theme}>
            <Application>
              <Route
                exact
                path="/Specialist/dashboard"
                render={(props) => {
                  return (
                    <SpecialistDashboard
                      {...props}
                      user={this.getCurrentUser}
                      authState={this.state.auth}
                      spinner={Spinner}
                      loaded={this.state.loading}
                      login={this.requestLoginSpecialist}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/AdminDashboard/newspecialist"
                render={(props) => {
                  return (
                    <AddSpecialistStart
                      {...props}
                      user={this.getCurrentUser}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Specialist/dashboard/ideas/:id"
                render={(props) => {
                  return (
                    <SpecialistIdeaDetails
                      {...props}
                      authState={this.state.auth}
                      sendInput={this.sendInput}
                      login={this.requestLoginSpecialist}
                      user={this.getCurrentUser}
                      logout={this.logout}
                      rejectIdea={this.rejectIdea}
                      updateProgress={this.updateProgress}
                      updateLocalStorage={this.updateLocalStorage}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Specialist/login"
                render={(props) => {
                  return (
                    <SpecialistLogin
                      {...props}
                      user={this.getCurrentUser}
                      authState={this.state.auth}
                      login={this.requestLoginSpecialist}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                      setAuthLoggedInTrue={this.setAuthLoggedInTrue}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/SpecialistStart"
                render={(props) => {
                  return (
                    <SpecialistStart
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginSpecialist}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                      setAuthLoggedInTrue={this.setAuthLoggedInTrue}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Investors/dashboard"
                render={(props) => {
                  return (
                    <InvestorDashboard
                      {...props}
                      user={this.getCurrentUser}
                      authState={this.state.auth}
                      login={this.requestLoginExpert}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Investors/dashboard/assess"
                render={(props) => {
                  return (
                    <AssesIdeas
                      {...props}
                      sendAssessment={this.sendAssessment}
                      authState={this.state.auth}
                      login={this.requestLoginExpert}
                      user={this.getCurrentUser}
                      logout={this.logout}
                      updateLocalStorage={this.updateLocalStorage}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/AssessmentSubmitted"
                render={(props) => {
                  return (
                    <CompleteAssessment
                      {...props}
                      sendAssessment={this.sendAssessment}
                      authState={this.state.auth}
                      login={this.requestLoginExpert}
                      user={this.getCurrentUser}
                      logout={this.logout}
                      updateLocalStorage={this.updateLocalStorage}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Investors/dashboard/idea/:id"
                render={(props) => {
                  return (
                    <InvestorIdeaDetails
                      {...props}
                      authState={this.state.auth}
                      sendAssessment={this.sendAssessment}
                      login={this.requestLoginExpert}
                      user={this.getCurrentUser}
                      logout={this.logout}
                      updateLocalStorage={this.updateLocalStorage}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Investors/dashboard/assess/:id"
                render={(props) => {
                  return (
                    <FormAssessIdeas
                      {...props}
                      authState={this.state.auth}
                      sendAssessment={this.sendAssessment}
                      login={this.requestLoginExpert}
                      user={this.getCurrentUser}
                      logout={this.logout}
                      updateLocalStorage={this.updateLocalStorage}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Investors/dashboard/crowdfunding"
                render={(props) => {
                  return (
                    <Crowdfunding
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginExpert}
                      user={this.getCurrentUser}
                      logout={this.logout}
                      updateLocalStorage={this.updateLocalStorage}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Investors/dashboard/mymentorships"
                render={(props) => {
                  return (
                    <MyMentorships
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginExpert}
                      user={this.getCurrentUser}
                      logout={this.logout}
                      updateLocalStorage={this.updateLocalStorage}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Investors/dashboard/invest"
                render={(props) => {
                  return (
                    <MyInvestments
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginExpert}
                      user={this.getCurrentUser}
                      logout={this.logout}
                      updateLocalStorage={this.updateLocalStorage}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Investors/login"
                render={(props) => {
                  return (
                    <InvestorLogin
                      {...props}
                      user={this.getCurrentUser}
                      authState={this.state.auth}
                      login={this.requestLoginExpert}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                      setAuthLoggedInTrue={this.setAuthLoggedInTrue}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/MyIdea"
                render={(props) => {
                  return (
                    <IdeaStart
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                      setAuthLoggedInTrue={this.setAuthLoggedInTrue}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/CofounderStart"
                render={(props) => {
                  return (
                    <CofounderStart
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                      setAuthLoggedInTrue={this.setAuthLoggedInTrue}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Cofounder/login"
                render={(props) => {
                  return (
                    <CofounderLogin
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                      setAuthLoggedInTrue={this.setAuthLoggedInTrue}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Cofounder/dashboard"
                render={(props) => {
                  return (
                    <CofounderDashboard
                      {...props}
                      user={this.getCurrentUser}
                      authState={this.state.auth}
                      login={this.requestLoginExpert}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Cofounder/dashboard/ideas"
                render={(props) => {
                  return (
                    <IdeasList
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/Cofounder/dashboard/:id/profile"
                render={(props) => {
                  return (
                    <CofounderProfile
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                      setAuthLoggedInTrue={this.setAuthLoggedInTrue}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/InvestorStart"
                render={(props) => {
                  return (
                    <InvestorStart
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginExpert}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                      setAuthLoggedInTrue={this.setAuthLoggedInTrue}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/MyIdea/dashboard"
                render={(props) => {
                  return (
                    <IdeaDashboard
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/AdminDashboard"
                render={(props) => {
                  return (
                    <AdminDashboard
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/AdminDashboard/ideas/:id"
                render={(props) => {
                  return (
                    <AdminDashboardDetail
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                      rejectIdea={this.rejectIdea}
                      updateProgress={this.updateProgress}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/AdminDashboard/rejected"
                render={(props) => {
                  return (
                    <AdminDashboardRejected
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/AdminDashboard/cofounders"
                render={(props) => {
                  return (
                    <AdminDashboardCofounders
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/dashboard/ideas/:id"
                render={(props) => {
                  return (
                    <IdeaDashboardDetail
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/cofounderProfileVideo"
                render={(props) => {
                  return <CofounderProfileVideo />;
                }}
              />
              <Route
                exact
                path="/cofounderPersonalityTest"
                render={(props) => {
                  return <CofounderPersonalityTest />;
                }}
              />
              <Route
                exact
                path="/dashboard/assess"
                render={(props) => {
                  return (
                    <UserAssessIdeas
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/MyIdea/login"
                render={(props) => {
                  return (
                    <IdeaLogin
                      {...props}
                      authState={this.state.auth}
                      loaded={this.state.loading}
                      spinner={Spinner}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      resetPassword={this.resetPassword}
                      updatePassword={this.updatePassword}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                      setAuthLoggedInTrue={this.setAuthLoggedInTrue}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/MyIdea/new"
                render={(props) => {
                  return (
                    <Submission
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                      setAuthLoggedInTrue={this.setAuthLoggedInTrue}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/reset-password"
                render={(props) => {
                  return (
                    <ResetPassword
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      resetPassword={this.resetPassword}
                      updatePassword={this.updatePassword}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/reset-password/:jwt"
                render={(props) => {
                  return (
                    <EnterNewPassword
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      resetPassword={this.resetPassword}
                      updatePassword={this.updatePassword}
                      updateLocalStorage={this.updateLocalStorage}
                      logout={this.logout}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/ideas/:id/automatch"
                render={(props) => {
                  return (
                    <AutoMatch
                      {...props}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      resetPassword={this.resetPassword}
                      updatePassword={this.updatePassword}
                      logout={this.logout}
                      updateLocalStorage={this.updateLocalStorage}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/ideas/:id/automatch/:patentNumber"
                render={(props) => {
                  return (
                    <AutoMatchDetails
                      {...props}
                      loadPdf={this.onDocumentLoadSuccess}
                      authState={this.state.auth}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      resetPassword={this.resetPassword}
                      updatePassword={this.updatePassword}
                      logout={this.logout}
                      updateLocalStorage={this.updateLocalStorage}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/dashboard/assess/:id"
                render={(props) => {
                  return (
                    <FormAssessIdeas
                      {...props}
                      authState={this.state.auth}
                      sendAssessment={this.sendAssessment}
                      login={this.requestLoginUser}
                      user={this.getCurrentUser}
                      logout={this.logout}
                      updateLocalStorage={this.updateLocalStorage}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/"
                render={(props) => (
                  <IdeaStart
                    {...props}
                    authState={this.state.auth}
                    login={this.requestLoginUser}
                    user={this.getCurrentUser}
                    updateLocalStorage={this.updateLocalStorage}
                    logout={this.logout}
                    setAuthLoggedInTrue={this.setAuthLoggedInTrue}
                  />
                )}
              />
            </Application>
          </ThemeProvider>
        </div>
      </Router>
    );
  }
}

const theme = {
  colors: {
    titleText: "#444444",
    accents: {
      primary: {
        dark: "#1A3D7C",
        light: "#4CC5F1",
      },
      secondary: {
        dark: "#233949",
        light: "#DFEFF2",
      },
    },
    bodyText: "#636363",
  },
};

const Application = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  color: ${(props) => props.theme.colors.bodyText};
`;

export default App;
