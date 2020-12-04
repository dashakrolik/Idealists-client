import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import CofounderApllicant from "./CofounderApplicant";
import List from "../../material-UI/List";

export default function AdminDashboardCofounders(props) {
  const [coFounders, set_coFounder] = useState([]);
  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/users/cofounders`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => {
          console.log(res.body);
          set_coFounder(res.body);
        });
    else props.history.replace("/login");
  }, []);

  return (
    <div style={styles.div}>
      <h1 style={styles.h1}>Admin DashBoard</h1>
      <h3 style={styles.h3}>Data</h3>
      <List data={coFounders} />
    </div>
  );
}

const styles = {
  div: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  h1: {
    // The reason of margin Top is because the initial
    //  element is behind the NavBar! CSS needs to be changed
    marginTop: "100px",
    color: "Blue",
  },
  h3: {
    color: "lightblue",
  },
};
