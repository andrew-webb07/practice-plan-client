import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Auth.css";


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
			<dialog ref={passwordDialog}>
				<div>Passwords do not match</div>
				<button
					onClick={(e) => passwordDialog.current.close()}
				>
					Close
				</button>
			</dialog>

			<h1>Register</h1>
			<form onSubmit={handleRegister}>
				<div className="registerColumn1 form--login">
					<fieldset>
						<input
							ref={firstName}
							type="text"
							name="firstName"
							className="form-control-firstName"
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
							className="form-control-lastName"
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
				</div>
				<div className="registerColumn2 form--login">
					<fieldset>
						<input
							ref={username}
							type="username"
							name="username"
							className="form-control-username"
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
                    <fieldset>
						<textarea
							ref={isPublic}
							type="text"
							name="isPublic"
							className="form-control"
							placeholder="Profile Public? Enter Yes or No"
							required
						/>
					</fieldset>
				</div>
				<button className="btn btn-1 btn-sep icon-send" type="submit">
					Register
				</button>
			</form>
			<section className="link--register">
				Already registered? <Link to="/login">Login</Link>
			</section>
		</main>
	);
};
