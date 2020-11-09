import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import axios from 'axios'

export const RegistrationPage = () => {

    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        retypePassword: ''
    })

    const [errors, setErrors] = useState({})

    const inputChangeHandler = evt => {
        setForm({...form, [evt.target.name]: evt.target.value})
    }

    const validateForm = () => {
        const newErrors = {}
        Object.keys(form).forEach(key => {
            if (form[key].trim() === '') {
                newErrors[key] = `Enter "${key}"!`
            }
            if (form.password !== form.retypePassword) {
                newErrors.password = 'Password not equals!'
                newErrors.retypePassword = 'Password not equals!'
            }
        })
        setErrors(newErrors)

        return Object.keys(newErrors).length === 0
    }

    const registerHandler = async evt => {
        evt.preventDefault()
        const validationResult = validateForm()

        if (validationResult) {
            try {
                // const res = await axios.get('/api/auth/hello')
                // console.log(res)
                const response = await axios.post('/api/auth/register', {...form}, {
                    headers: {
                        'content-type': 'application/json charset=utf-8'
                    }
                })

                if (response.errors) {
                    setErrors(response.errors)
                }

                console.log(response)
            } catch (e) {
                console.log(e.message)
            }
        }
    }

    return (
        <div className="row d-flex justify-content-center align-items-center flex-column h-100">
            <h3>Login</h3>
            <form onSubmit={registerHandler}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        onChange={inputChangeHandler}
                    />
                    { errors.email && <small className="text-danger">{errors.email}</small> }
                </div>
                <div className="form-group">
                    <label htmlFor="email">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        onChange={inputChangeHandler}
                    />
                    { errors.username && <small className="text-danger">{errors.username}</small> }
                </div>
                <div className="form-group">
                    <label htmlFor="email">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={inputChangeHandler}
                    />
                    { errors.password && <small className="text-danger">{errors.password}</small> }
                </div>
                <div className="form-group">
                    <label htmlFor="email">Retype password</label>
                    <input
                        type="password"
                        name="retypePassword"
                        id="retypePassword"
                        className="form-control"
                        onChange={inputChangeHandler}
                    />
                    { errors.retypePassword && <small className="text-danger">{errors.retypePassword}</small> }
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Sign up
                    </button>
                    <NavLink
                        className="btn btn-primary"
                        to="/"
                    >
                        Back
                    </NavLink>
                </div>
            </form>
        </div>
    )
}