import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import List from "../../material-UI/List";

export default function AdminDashboardCofounders(props) {
  const [coFounders, set_coFounder] = useState([]);
  useEffect(() => {
    console.log("props.authState", props.authState);
    console.log("props.authState", props.authState);
    console.log("props.authState", props.authState);
    console.log("props.authState", props.authState);
    console.log("props.authState", props.authState);
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
    <div style={styles.div}>
      <h1 style={styles.h1}>Admin DashBoard</h1>
      <h3 style={styles.h3}>These co-founders are still awaiting approval:</h3>
      <List
        data={coFounders}
        authState={props.authState}
        setCofounders={set_coFounder}
        coFounders={coFounders}
      />
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
    color: "#0f8ddb",
  },
  h3: {
    color: "#0f8ddb",
  },
};
