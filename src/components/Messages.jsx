// Messages: Displays all chat messages for a given server channel.

import "../styles/messages.scss";

export default function Messages() {
	return (
		<div className="messages">
			{/* Loop through messages here! */}
			<article className="messages-chat">
				<picture className="messages-pfp">
					<img src="https://placehold.co/128?text=M" alt="Mary Grapevine" />
				</picture>
				<div className="messages-content">
					<h4 className="messages-username">Mary Grapevine</h4>
					<span className="messages-text">I love grapes!</span>
				</div>
			</article>
			{/* End messages loop here! */}
		</div>
	);
}