// Modal: General dialog modal for user interactions.

import { useEffect, useRef } from 'react'

import '../styles/modal.scss'

export default function Modal({ open, setOpen, title, children }) {
    // Create reference to dialog:
    const ref = useRef(null)

    // Create handler for showing modal:
    function showHandler() {
        ref.current.showModal()
        setOpen(true)
    }

    // Create handler for dismissing modal:
    function closeHandler() {
        ref.current.close()
        setOpen(false)
    }

    // Update display based on outer state:
    useEffect(() => {
        !!open ? showHandler() : closeHandler()
    }, [open])

    return (
        <dialog
            ref={ref}
            className="modal"
            onCancel={(event) => event.preventDefault()}
        >
            <div className="modal-wrapper">
                <h2 className="modal-title">{title || 'Untitled Modal'}</h2>
                <div className="modal-content">{children}</div>
                <button className="modal-close" onClick={closeHandler}>
                    &times;
                </button>
            </div>
        </dialog>
    )
}
