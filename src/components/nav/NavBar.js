import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/sessions">Session</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/practiceplans">Plan</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/exercises">Exercise</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Category</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" onClick={(event) => localStorage.removeItem("practice-plan_user_token")} to="/login">Logout</Link>
            </li>
        </ul>
    )
}