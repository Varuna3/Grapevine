// Dock: Scrollable list of separated server and navigation items.

import "../styles/dock.scss";

export default function Dock({ anchors }) {
	return (
		<nav className="dock">
			{anchors.map(({ title, action, image, isServer = false }, index) => (
				<a
					key={index}
					className="dock-item"
					data-label={title[0]}
					data-server={isServer}
					onClick={action}>
					{image && (
						<img className="dock-item-image" src={image} alt={title} />
					)}
				</a>
			))}
		</nav>
	);
}