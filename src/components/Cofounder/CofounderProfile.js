import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import "../MyIdea/Dashboard/IdeaDashboard.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./IdeaList.css";
import Rating from "./Rating";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginBottom: "15vh",
    position: "relative",
    top: "10vh",
    left: "35%",
  },
  media: {
    height: 140,
  },
});

export default function CofounderProfile(props) {
  const parsedParameters = parseInt(props.match.params.id);
  const classes = useStyles();
  const [profile, set_profile] = useState();
  useEffect(() => {
    if (
      props.authState.loggedIn &&
      props.authState.user.id === parseInt(parsedParameters)
    ) {
      request
        .get(`${baseUrl}/users/cofounders/profile`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => {
          set_profile(res.body);
        });
    } else if (
      props.authState.loggedIn &&
      props.authState.user.id !== parseInt(parsedParameters)
    ) {
      request
        .get(`${baseUrl}/users/cofounders/${parsedParameters}/profile`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => {
          set_profile(res.body);
        });
    } else props.history.replace("/login");
  }, []);

  return (
    <div className="dashboard-container" style={{ paddingTop: "80px" }}>
      {
        <div className="flex-ideacontainer">
          {profile ? (
            <div className="data-div">
              <table id="customers">
                <tbody>
                  <tr>
                    <th>Question</th>
                    <th>Answer</th>
                  </tr>
                  <tr>
                    <td>Who am I</td>
                    <td>{profile.who}</td>
                  </tr>
                  <tr>
                    <td>Why I want to be an impactful co-founder</td>
                    <td>{profile.why}</td>
                  </tr>
                  <tr>
                    <td>
                      Why now is the right timing for me to become an impactful
                      co-founder
                    </td>
                    <td>{profile.whyNow}</td>
                  </tr>
                  <tr>
                    <td>
                      The UN Sustainable Development Goal that interests me the
                      most and why
                    </td>
                    <td>{profile.UNgoals}</td>
                  </tr>
                  <tr>
                    <td>Something exceptional I have done, built or created</td>
                    <td>{profile.pride}</td>
                  </tr>
                  <tr>
                    <td>My work experience</td>
                    <td>{profile.workExperience}</td>
                  </tr>
                  <tr>
                    <td>My educational background</td>
                    <td>{profile.eduBackground}</td>
                  </tr>
                  <tr>
                    <td>The language(s) I speak</td>
                    <td>{profile.languages}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ marginTop: "50px" }}>loading...</p>
          )}
          {props.authState.user.id !== parseInt(parsedParameters) ? (
            <Rating authState={props.authState} match={props.match} />
          ) : null}
        </div>
      }
    </div>
  );
}
