import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";

export const PracticePlan = () => {

return (
        <>
        <Route
        render={() => {
            if (localStorage.getItem("practice-plan_user_token")) {
            return (
                <>
                    <NavBar />
                    <ApplicationViews />
                </>
            );
            } else {
            return <Redirect to="/login" />;
            }
        }}
        />

        <Route path="/login">
        <Login />
        </Route>
        <Route path="/register">
        <Register />
        </Route>
    </>
    )
}