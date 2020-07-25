import React from "react";
import Messages from "../components/Messages";
import MessageForm from "../components/MessageForm";
import Header from "../components/Header";
import firebase from "firebase";

const Home = ({ history }) => {
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
				<Messages />
				<MessageForm currentUser={currentUser} />
			</main>
		</>
	);
};

export default Home;
