// Dock: Scrollable list of separated server and navigation items.

import '../styles/dock.scss'

export default function Dock({
    anchors,
    setCurrentServer,
    showSettings,
    setShowSettings,
}) {
    return (
        <nav className="dock">
            <div className="dock-server-container">
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
                <a
                    key={'dont-tell-anyone'}
                    className="dock-item"
                    data-label={'+'}
                    data-server={true}
                    onClick={() => {
                        console.log('hehe')
                    }}
                ></a>
            </div>

            <a
                key={'super-secret-key'}
                className="dock-item"
                data-item-image="https://cdn-icons-png.flaticon.com/512/126/126472.png"
                data-server={false}
                onClick={() => {
                    setShowSettings(!showSettings)
                }}
            >
                {
                    <img
                        className="dock-item-image"
                        style={{ backgroundColor: 'white' }}
                        src="https://cdn-icons-png.flaticon.com/512/900/900834.png"
                        alt="Settings"
                    />
                }
            </a>
        </nav>
    )
}
