import React, { useState } from "react";
import img from "../images/avatar.jpeg";
import moment from "moment";
import {
	faTrashAlt,
	faHeart,
	faComment,
} from "@fortawesome/free-regular-svg-icons";
import {
	faSync,
	faUpload,
	faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const MessageItem = ({ message }) => {
	const { text, timestamp, name, photoUrl, file, userId } = message;
	const [pullDown, setPullDown] = useState(false);

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
						<Link to={"/users/" + userId}>{name}</Link>
					</h4>
					<small>{moment(timestamp).fromNow()}</small>
					<div className="pullDown">
						<FontAwesomeIcon
							icon={faAngleDown}
							className="angleIcon"
							onClick={() => setPullDown(!pullDown)}
						/>
						{pullDown && (
							<section>
								<ul>
									<li onClick={handleDelete}>Delete</li>
								</ul>
							</section>
						)}
					</div>
				</header>
				<p>{text}</p>
				{file && <img src={file} alt="idk" />}
				<ul className="icons">
					<li>
						<FontAwesomeIcon icon={faComment} />
					</li>
					<li>
						<FontAwesomeIcon icon={faSync} />
					</li>
					<li>
						<FontAwesomeIcon icon={faHeart} />
					</li>
					<li>
						<FontAwesomeIcon icon={faUpload} />
					</li>
				</ul>
			</div>
		</article>
	);
};

export default MessageItem;
