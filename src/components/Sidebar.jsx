// Sidebar: Side drawer for user separated content.

import { useEffect } from 'react'

import '../styles/sidebar.scss'

export default function SideBar({ open, setOpen, align, children }) {
    // Create handler for showing sidebar:
    function showHandler() {
        setOpen(true)
    }

    // Create handler for dismissing sidebar:
    function closeHandler() {
        setOpen(false)
    }

    // Update display based on outer state:
    useEffect(() => {
        !!open ? showHandler() : closeHandler()
    }, [open])

    return (
        <aside className={['sidebar', align].join(' ')} data-open={open}>
            <div className="sidebar-content">{children}</div>
            <button className="sidebar-close" onClick={closeHandler}>
                &times;
            </button>
        </aside>
    )
}
