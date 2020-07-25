import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import MessageItem from "./MessageItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Messages = () => {
	useEffect(() => {
		db.collection("messages")
			.orderBy("timestamp", "asc")
			.onSnapshot((snapshot) => {
				snapshot.docChanges().forEach(function (change) {
					if (change.type === "added") {
						setMessages((oldArray) => [
							change.doc.data(),
							...oldArray,
						]);
					}
					if (change.type === "modified") {
						console.log("Modified: ", change.doc.data());
					}
					if (change.type === "removed") {
						setMessages((oldArray) => [
							...oldArray.filter(
								(message) =>
									message.id !== change.doc.data().id,
							),
						]);
					}
				});
			});

		return () => {};
	}, []);

	const [messages, setMessages] = useState([]);

	return (
		<div className="messages">
			{messages.map((message) => (
				<MessageItem message={message} key={message.id} />
			))}
		</div>
	);
};

export default Messages;
