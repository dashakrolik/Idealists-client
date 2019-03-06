import React, { useState } from 'react'

export default function SignupForm(props) {

    const [formState, setFormState] = useState({});


    const handleSubmit = (e) => {
        e.preventDefault()
        props.onSubmit(formState)
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value
        })
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
            <input type="email" name="email" value={
                        formState.email || ''
                    } onChange={handleChange} />
                </label><br />

                <label>
                    First Name
            <input type="firstName" name="firstName" value={
                        formState.firstName || ''
                    } onChange={handleChange} />
                </label><br />

                <label>
                    Last Name
            <input type="lastName" name="lastName" value={
                        formState.lastName || ''
                    } onChange={handleChange} />
                </label><br />

                <label>
                    Password
  					<input type="password" name="password" value={
                        formState.password || ''
                    } onChange={handleChange} />
                </label><br />

                <label>
                    Confirm password
  					<input type="password" name="confirmPassword" value={
                        formState.confirmPassword || ''
                    } onChange={handleChange} />
                </label><br />

                {
                    formState.password &&
                    formState.confirmPassword &&
                    formState.password !== formState.confirmPassword &&
                    <p style={{ color: 'red' }}>The passwords do not match!</p>
                }

                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}
