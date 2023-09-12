// Dock: Scrollable list of separated server and navigation items.

import { useEffect } from 'react'
import '../styles/dock.scss'

export default function Dock({ anchors, setCurrentServer }) {
    useEffect(() => {
        console.log(anchors)
    }, [])

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
            </div>
            <a
                key={'super-secret-key'}
                className="dock-item"
                data-item-image="https://cdn-icons-png.flaticon.com/512/126/126472.png"
                data-server={false}
                onClick={() => {
                    console.log('rawr')
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
