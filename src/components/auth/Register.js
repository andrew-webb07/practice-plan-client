import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Auth.css";
import Practice_Plan_NO_BORDER_02 from "../images/Practice_Plan_NO_BORDER_02.png"


export const Register = () => {
	const firstName = useRef();
	const lastName = useRef();
	const bio = useRef();
	const username = useRef();
	const password = useRef();
	const practiceFocus = useRef();
    const isPublic = useRef()
	const email = useRef();
	const verifyPassword = useRef();
	const passwordDialog = useRef();
	const history = useHistory();

    console.log(isPublic.current)

	const handleRegister = (e) => {
		e.preventDefault();
		if (password.current.value === verifyPassword.current.value) {
			const newUser = {
				username: username.current.value,
				first_name: firstName.current.value,
				last_name: lastName.current.value,
				email: email.current.value,
				password: password.current.value,
				practice_focus: practiceFocus.current.value,
				bio: bio.current.value,
                is_public: isPublic.current.value.toUpperCase() === "YES"
			};

			return fetch("http://127.0.0.1:8000/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(newUser),
			})
				.then((res) => res.json())
				.then((res) => {
					localStorage.setItem("practice-plan_user_token", res.token);
					history.push("/");
				});
		} else {
			passwordDialog.current.showModal();
		}
	};

	return (
		<main style={{ textAlign: "center" }}>
			<dialog className="dialog dialog--auth" ref={passwordDialog}>
				<div>Passwords do not match</div>
				<button className="button--close" onClick={(e) => passwordDialog.current.close()}>Close</button>
			</dialog>

			<div className="container--login">
			<form onSubmit={handleRegister}>
				<div className="form--register">
				<div className="logoContainer">
            <img src={Practice_Plan_NO_BORDER_02} alt="logo" className="logo" />
        </div>
					<fieldset>
						<input
							ref={firstName}
							type="text"
							name="firstName"
							className="form-control"
							placeholder="First name"
							required
							autoFocus
						/>
					</fieldset>
					<fieldset>
						<input
							ref={lastName}
							type="text"
							name="lastName"
							className="form-control"
							placeholder="Last name"
							required
						/>
					</fieldset>
					<fieldset>
						<input
							ref={email}
							type="email"
							name="email"
							className="form-control"
							placeholder="Email address"
							required
						/>
					</fieldset>
					<fieldset>
						<input
							ref={username}
							type="username"
							name="username"
							className="form-control"
							placeholder="Username"
							required
						/>
					</fieldset>
					<fieldset>
						<input
							ref={password}
							type="password"
							name="password"
							className="form-control"
							placeholder="Password"
							required
						/>
					</fieldset>
					<fieldset>
						<input
							ref={verifyPassword}
							type="password"
							name="verifyPassword"
							className="form-control"
							placeholder="Verify password"
							required
						/>
					</fieldset>
                    <fieldset>
						<input
							ref={practiceFocus}
							type="text"
							name="practiceFocus"
							className="form-control"
							placeholder="Practice Focus"
							required
						/>
					</fieldset>
					<fieldset>
						<input
							ref={isPublic}
							type="text"
							name="isPublic"
							className="form-control"
							placeholder="Profile Public? Enter Yes or No"
							required
						/>
					</fieldset>
					<fieldset>
						<textarea
							ref={bio}
							rows="5"
							type="textarea"
							name="bio"
							className="form-control"
							placeholder="Bio"
							required
						/>
					</fieldset>
					<fieldset style={{
                        textAlign:"center"
                    }}>
                        <button className="btn" type="submit">Register Player</button>
                    </fieldset>
				<section className="link--register">
				Already registered? <Link className="link--register" to="/login">Login</Link>
				</section>
				</div>
			</form>
			</div>
		</main>
	);
};
