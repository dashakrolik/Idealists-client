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
            .then((res) =>
                setUserIdeas(res.body)
            );
    }, []);
    console.log(userIdeas)

    if (props.authState.loggedIn === false) return <h1>Not logged in</h1>;

    if (!props.authState.user) {
        console.log(props.authState)
        props.user();
    }


    return (
        <div className="dashboard-container">
            <br />
            <br />
            <br />
            <h2 style={styledH2}> list</h2>
            {userIdeas.map((idea) => {
                return <Link to={`/Cofounder/Dashboard/ideas/${idea.id}`}>
                    <div className='list-container'key={idea.id}>
                        <p style={styledP}>
                            {idea.idea[3].answers[0].qAnswer}
                        </p>
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