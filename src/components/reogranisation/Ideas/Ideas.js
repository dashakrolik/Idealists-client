import React, {useState, useEffect} from 'react'
// import request from 'superagent'
// import {baseUrl} from '../../constants'

export default function Ideas (props) {

    return (
        <div>
            {sampleData[0].idea}
        </div>
    )
}

const sampleData =
    [
        {
            "createdAt": "2019-03-12T13:57:40.889Z",
            "id": 1,
            "idea": "{\"question1\":\"answer1\",\"question2\":\"answer2\",\"question3\":\"answer3\"}"
        },
        {
            "createdAt": "2019-03-12T13:57:54.639Z",
            "id": 2,
            "idea": "{\"question1\":\"answer1\",\"question2\":\"answer2\",\"question3\":\"answer3\"}"
        },
        {
            "createdAt": "2019-03-12T13:58:14.973Z",
            "id": 3,
            "idea": "{\"question1\":\"answer1\",\"question2\":\"answer2\",\"question3\":\"answer3\"}"
        }
    ]