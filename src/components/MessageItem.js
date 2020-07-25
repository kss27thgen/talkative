import React from "react";
import img from "../images/avatar.jpeg";
import moment from "moment";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const MessageItem = ({ message }) => {
	const { text, timestamp, name, photoUrl, file, id } = message;

	const handleDelete = () => {
		db.collection("messages").doc(message.id).delete();
	};
	return (
		<article className="message">
			<div className="message--left">
				<p>
					<img src={photoUrl ? photoUrl : img} alt="avatar" />
				</p>
			</div>
			<div className="message--right">
				<header>
					<h4>
						<Link to={"/users/" + id}>{name}</Link>
					</h4>
					<small>{moment(timestamp).fromNow()}</small>
					<FontAwesomeIcon
						icon={faTrashAlt}
						className="trashIcon"
						onClick={handleDelete}
					/>
				</header>
				<p>{text}</p>
				{file && <img src={file} alt="idk" />}
			</div>
		</article>
	);
};

export default MessageItem;
