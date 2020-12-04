import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import CofounderApllicant from "./CofounderApplicant";
export default function AdminDashboardCofounders(props) {
  const [coFounders, set_coFounder] = useState();
  useEffect(() => {
    if (props.authState.loggedIn)
      request
        .get(`${baseUrl}/users/cofounders`)
        .set("Authorization", `Bearer ${props.authState.token}`)
        .then((res) => {
          console.log(res);
        });
    else props.history.replace("/login");
  }, []);

  return (
    <div>
      {coFounders ? (
        coFounders.map((c) => {
          return <CofounderApllicant cofounderProps={c} />;
        })
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
