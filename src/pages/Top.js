import React, { useState } from "react";
import firebase from "../firebase";

const Top = ({ history }) => {
	const [signedUp, setSignedUp] = useState(true);
	const [errors, setErrors] = useState([]);
	const [form, setForm] = useState({
		nickname: "",
		email: "",
		password: "",
		passwordConf: "",
	});

	const { nickname, email, password, passwordConf } = form;

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleGoogleAuth = () => {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function (result) {
				// The signed-in user info.
				var user = result.user;
				console.log(user);
				history.push("/");
			})
			.catch(function (error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
			});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (signedUp) {
			try {
				const res = await firebase
					.auth()
					.signInWithEmailAndPassword(email, password);
				history.push("/");
			} catch (err) {
				return setErrors([...errors, err.message]);
			}
		} else {
			if (password !== passwordConf) {
				return setErrors([...errors, "password did not match"]);
			}
			try {
				const res = await firebase
					.auth()
					.createUserWithEmailAndPassword(email, password);
				await res.user.updateProfile({
					displayName: nickname,
					photoURL: `https://i.pravatar.cc/300?u=${email}`,
				});
				history.push("/");
			} catch (err) {
				return setErrors([...errors, err.message]);
			}
		}
	};

	return (
		<main className="top">
			<form onSubmit={handleSubmit}>
				<button type="button" onClick={handleGoogleAuth}>
					Sign In with Google
				</button>
				<em>OR</em>
				{errors.length > 0 &&
					errors.map((error, i) => (
						<div key={i} className="error">
							{error}
						</div>
					))}
				{!signedUp && (
					<input
						type="text"
						name="nickname"
						value={nickname}
						autoComplete="off"
						placeholder="nickname"
						onChange={handleChange}
					/>
				)}
				<input
					type="email"
					name="email"
					placeholder="email"
					value={email}
					onChange={handleChange}
				/>

				<input
					type="password"
					name="password"
					placeholder="password"
					value={password}
					onChange={handleChange}
				/>

				{!signedUp && (
					<input
						type="password"
						name="passwordConf"
						value={passwordConf}
						onChange={handleChange}
						placeholder="confirm password"
					/>
				)}

				<input type="submit" value={signedUp ? "Sign In" : "Sign Up"} />
				<p onClick={() => setSignedUp(!signedUp)}>
					{signedUp ? "Make a account?" : "Already have an account?"}
				</p>
			</form>
		</main>
	);
};

export default Top;
