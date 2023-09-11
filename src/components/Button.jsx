// Button: Simple clickable action element with callback.

import '../styles/button.scss'

export default function Button({ action, type, variant, children }) {
    return (
        <button
            className={['button', variant].join(' ')}
            type={type}
            onClick={action}
        >
            {children}
        </button>
    )
}
