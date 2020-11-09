import React, {useState} from 'react'
import {NavLink} from "react-router-dom";

export const LoginPage = () => {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const inputChangeHandler = evt => {
        setForm({...form, [evt.target.name]: evt.target.value})
    }

    const formSubmitHandler = evt => {
        evt.preventDefault()
    }

    return (
        <div className="row d-flex justify-content-center align-items-center flex-column h-100">
            <h3>Login</h3>
            <form onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={inputChangeHandler}
                    />
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Sign in
                    </button>
                    <NavLink
                        className="btn btn-primary"
                        to="/register"
                    >
                        Sign up
                    </NavLink>
                </div>
            </form>
        </div>
    )
}