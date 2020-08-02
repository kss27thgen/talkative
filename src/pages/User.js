import React from "react";
import MessageForm from "../components/MessageForm";
import UserMessages from "../components/UserMessages";
import Header from "../components/Header";
import firebase from "firebase";

const Home = ({ history, match }) => {
	var user = firebase.auth().currentUser;
	var currentUser;

	if (user != null) {
		currentUser = {
			name: user.displayName,
			email: user.email,
			photoUrl: user.photoURL,
			uid: user.uid,
		};
	} else {
		history.push("/top");
	}

	return (
		<>
			<Header />
			<main className="main">
				<UserMessages match={match} />
				<MessageForm currentUser={currentUser} />
			</main>
		</>
	);
};

export default Home;
