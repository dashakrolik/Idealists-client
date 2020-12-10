import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import List from "../../material-UI/List";
import "../MyIdea/Dashboard/IdeaDashboard.css";

export default function AdminDashboardCofounders(props) {
  const [coFounders, set_coFounder] = useState([]);
  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/users/cofounders`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => {
          set_coFounder(res.body);
        });
    else props.history.replace("/login");
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Admin DashBoard</h1>
      <h3 className="subHeading">
        These co-founders are still awaiting approval
      </h3>

      <List
        data={coFounders}
        authState={props.authState}
        setCofounders={set_coFounder}
        coFounders={coFounders}
      />
    </div>
  );
}
