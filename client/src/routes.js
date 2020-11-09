import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {LoginPage} from './pages/LoginPage'
import {RegistrationPage} from './pages/RegistrationPage'

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <LoginPage />
            </Route>
            <Route path="/register" exact>
                <RegistrationPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}