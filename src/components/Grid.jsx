// Grid: Layout grid using breakpoints.

import "../styles/grid.scss";

export default function Grid({ width = "", align = "", children }) {
	return (
		<div className={["grid", width, align].join(" ")}>
			<div className="grid-content">
				{children}
			</div>
		</div>
	);
}