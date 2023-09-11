import axios from 'axios'
import { useState, useEffect, useRef } from 'react'

export default function ShowInvites({
    showInvitesModal,
    setShowInvitesModal,
    serverId,
}) {
    const [invites, setInvites] = useState([])

    const modalRef = useRef()

    useEffect(() => {
        if (!modalRef.current) return
        if (showInvitesModal) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
    }, [showInvitesModal])

    return (
        <>
            <button
                onClick={async () => {
                    setShowInvitesModal(true)
                    const invites = await axios.get(`/api/invites/${serverId}`)
                    setInvites(invites)
                }}
            >
                Show Invites
            </button>
        </>
    )
}
