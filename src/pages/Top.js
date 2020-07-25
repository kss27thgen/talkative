import React, { useState } from "react";
import firebase from "../firebase";

const Top = ({ history }) => {
	const [signedIn, setSignedIn] = useState(false);

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
	return (
		<main className="top">
			<form>
				<button type="button" onClick={handleGoogleAuth}>
					Sign In with Google
				</button>
				<em>OR</em>
				{!signedIn && (
					<input
						type="text"
						name="nickname"
						autoComplete="off"
						placeholder="nickname"
					/>
				)}
				<input type="email" name="email" placeholder="email" />
				{!signedIn && (
					<input
						type="password"
						name="passwordConf"
						placeholder="password"
					/>
				)}

				<input
					type="password"
					name="password"
					placeholder="confirm password"
				/>
				<input type="submit" value={signedIn ? "Sign In" : "Sign Up"} />
				<p onClick={() => setSignedIn(!signedIn)}>
					{signedIn ? "Make a account?" : "Already have an account?"}
				</p>
			</form>
		</main>
	);
};

export default Top;
