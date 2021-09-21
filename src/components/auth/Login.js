import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./Auth.css"
import Practice_Plan_NO_BORDER_02 from "../images/Practice_Plan_NO_BORDER_02.png"

export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid) {
                    localStorage.setItem("practice-plan_user_token", res.token )
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
                <div className="container--login">
                <form className="form--login" onSubmit={handleLogin}>
                <div className="logoContainer">
                    <img src={Practice_Plan_NO_BORDER_02} alt="logo" className="logo" />
                </div>
                <h3>Please Sign In</h3>
                    <fieldset>
                        <input ref={username} type="text" id="username" className="form-control" placeholder="Username" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <input ref={password} type="password" id="password" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign:"center"
                    }}>
                        <button className="btn" type="submit">Sign In</button>
                    </fieldset>
                    <section className="link--register">
                <Link className="link--register" to="/register">Don't have an account yet? Click here to sign up!</Link>
            </section>
                </form>
                </div>
        </main>
    )
}
