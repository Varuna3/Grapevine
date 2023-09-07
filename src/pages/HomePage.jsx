// Home Page: Page for displaying and creating new server messages.

import InputArea from "../components/InputArea";
import Messages from "../components/Messages";

import "../styles/home-page.scss";

export default function HomePage() {
	return (
		<main className="home-page">
			<Messages />
			<InputArea callback={(message) => {
				socket.emit("client message", { message });
			}}/>
		</main>
	);
}