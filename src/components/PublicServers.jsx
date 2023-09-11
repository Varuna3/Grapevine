import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const PublicServers = () => {
    const modalRef = useRef()

    useEffect(() => {
        if (!modalRef.current) return

        if (showAllServersModal) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
    }, [showAllServersModal])

    return (
    <>
        <dialog ref={modalRef}>
            <h2>Public Servers</h2>
        </dialog>
    </>
    )
}

export default PublicServers