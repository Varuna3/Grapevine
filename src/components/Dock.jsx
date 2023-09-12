// Dock: Scrollable list of separated server and navigation items.

import '../styles/dock.scss'

export default function Dock({ anchors, setCurrentServer }) {

    return (
        <nav className="dock">
            {anchors.map((e, index) => {
                const { name, image, isServer = true } = e
                return (
                    <a
                        key={index}
                        className="dock-item"
                        data-label={name[0]}
                        data-server={isServer}
                        onClick={() => {
                            setCurrentServer(e)
                        }}
                    >
                        {image && (
                            <img
                                className="dock-item-image"
                                src={image}
                                alt={name}
                            />
                        )}
                    </a>
                )
            })}
        </nav>
    )
}
