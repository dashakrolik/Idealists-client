import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import CofounderApllicant from "./CofounderApplicant"
export default function AdminDashboardCofounders(props) {
  const [coFounders, set_coFounder] = useState();
  useEffect(() => {
    request
      .get(`${baseUrl}/users/cofounders`)
      .set("Authorization", `Bearer ${props.authState.token}`)
      .then((res) => {
        set_coFounder(res.data);
      });
  }, []);
console.log(coFounders)
console.log(props.authState.token)

  return (
    <div>
        {coFounders ? coFounders.map((c)=>{ return <CofounderApllicant cofounderProps={c}/>})  : <p>loading...</p>        }
    </div>
  );
}
