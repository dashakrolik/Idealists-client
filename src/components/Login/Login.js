import React, { useState } from 'react'
import request from 'superagent'
import {baseUrl} from '../../constants'

export default function Login(props) {

    const [loginState, setLoginState] = useState({});


    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(loginState)
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setLoginState({
            ...loginState,
            [name]: value
        })
    }

    const onSubmit = (data) => {
        console.log(data)
    }


    const onSubmit = (data) => (dispatch) => {
        const { email, password } = data
        request
            .post(`${baseUrl}/logins`)
            .send({ email, password })
            .then(
                // result => dispatch(userLoginSuccess(result.body))
            )
            .catch(err => {
                if (err.status === 400) {
                    // dispatch(userLoginFailed(err.response.body.message))
                }
                else {
                    console.error(err)
                }
            })
        }

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email
            <input type="email" name="email" value={
                            loginState.email || ''
                        } onChange={handleChange} />
                    </label><br />

                    <label>
                        Password
  					<input type="password" name="password" value={
                            loginState.password || ''
                        } onChange={handleChange} />
                    </label><br />

                    <button type="submit">Login</button>

                </form>
            </div>)
    }