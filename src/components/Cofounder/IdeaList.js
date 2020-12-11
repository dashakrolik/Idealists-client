import React, { useEffect, useState } from "react";
import request from "superagent";
import { baseUrl } from "../../constants";
import styled from "@emotion/styled";
import { Redirect, Link } from "react-router-dom";
import "./IdeaList.css";


export default function IdeasList(props) {
    const [user, setUserData] = useState({});
    const [userIdeas, setUserIdeas] = useState([]);


    useEffect(() => {
        if (props.authState.loggedIn)
            request
                .get(`${baseUrl}/current`)
                .set("Authorization", `Bearer ${props.authState.token}`)
                .then((res) => setUserData(res.body));
        else props.history.replace("/MyIdea/login");
    }, []);

    useEffect(() => {
        request
            .get(`${baseUrl}/ideas`)
            .set("Authorization", `Bearer ${props.authState.token}`)
            .then((res) => {
                if (res.body.length === 0) {
                    alert("there are no ideas")
                }
                setUserIdeas(res.body)
            }
            );
    }, []);


    if (props.authState.loggedIn === false) return <h1>Not logged in</h1>;

    if (!props.authState.user) {
        props.user();
    }


    return (
        <div className="dashboard-container">
            <br />
            <br />
            <br />
            <h2 style={styledH2}> All Validated Ideas</h2>
            {userIdeas.map((idea) => {
                return <Link to={{ pathname: `/cofounder/dashboard/ideas/${idea.id}`, query: { user: user } }} className='ideaDetail-link'>
                    <div className='list-container' key={idea.id}>
                        <div>

                            <p style={styledP}>
                                {idea ? idea.idea[5].answers[0].qAnswer : null}
                            </p>
                        </div>
                    </div>
                </Link>
            })}

        </div>
    );
}

const styledH2 = {
    fontSize: 20,
    fontWeight: 800,
    color: "white",
};
const styledP = {
    color: 'white'
}

const styledSpan = {
    color: "white",
    marginTop: 5,
    padding: 3,

}