import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import firebase, { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const MessageForm = ({ currentUser }) => {
	const [form, setForm] = useState({
		text: "",
		filename: "",
		file: "",
	});

	const selectFile = (e) => {
		setForm({
			...form,
			filename: e.target.files[0].name,
			file: e.target.files[0],
		});
	};

	const handleText = (e) => {
		setForm({
			...form,
			text: e.target.value,
		});
	};

	const clearForm = () => {
		setForm({
			text: "",
			filename: "",
			file: "",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const id = uuidv4();
		let messsageData = {
			name: currentUser.name,
			text: form.text,
			id,
			timestamp: Date.now(),
			photoUrl: currentUser.photoUrl,
		};
		if (form.file !== "") {
			var storageRef = firebase
				.storage()
				.ref()
				.child(`images/${form.filename}`);
			await storageRef.put(form.file);
			await storageRef.getDownloadURL().then((url) => {
				messsageData.file = url;
			});
		}
		db.collection("messages").doc(id).set(messsageData);
		clearForm();
	};

	return (
		<>
			<form className="messageForm" onSubmit={handleSubmit}>
				<div className="messageForm--left">
					<input
						type="text"
						value={form.text}
						onChange={handleText}
					/>
					<small>{form.filename && form.filename}</small>
				</div>
				<div className="messageForm--right">
					<label htmlFor="file">
						<FontAwesomeIcon icon={faFileAlt} />
					</label>
					<input type="file" id="file" onChange={selectFile} hidden />
					<button type="submit">
						<FontAwesomeIcon icon={faPaperPlane} />
					</button>
				</div>
			</form>
		</>
	);
};

export default MessageForm;
