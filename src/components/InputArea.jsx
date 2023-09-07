// Input Area: Multiline text input area for composing chat messages.

import { useState, useId } from "react";

import Button from "./Button";

import "../styles/input-area.scss";

export default function InputArea({ callback }) {
	// Create state for message area text:
	const [message, setMessage] = useState("");

	// Create a unique ID for the textarea:
	const inputId = useId();

	// Create handler for when message is sent:
	function submitHander(event) {
		// Prevent page reload:
		event.preventDefault();

		// Callback with message data:
		callback(message);
	}

	return (
		<form className="input-area" onSubmit={submitHander}>
			<label
				className="input-area-label"
				htmlFor={inputId}>
				Enter Message:
			</label>
			<textarea
				className="input-area-field"
				id={inputId}
				autoFocus={true}
				autoComplete="off"
				value={message}
				onChange={(event) => {
					setMessage(event.target.value);
				}}
			/>
			<Button
				variant="primary"
				children="Send"
			/>
		</form>
	);
}