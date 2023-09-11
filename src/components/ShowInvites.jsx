import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'

export default function ShowInvites({
    showInvitesModal,
    setShowInvitesModal,
    serverId,
    invites,
    setInvites,
}) {
    const [inviteDivs, setInviteDivs] = useState([])

    const modalRef = useRef()

    useEffect(() => {
        if (!modalRef.current) return

        if (showInvitesModal) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
        let tmp = []
        invites.forEach((e) => {
            tmp = [...tmp, formatInviteDiv(e.invite)]
        })
        setInviteDivs(tmp)
    }, [showInvitesModal, invites])

    function formatInviteDiv(invite) {
        return (
            <div key={invite} style={{ display: 'flex', gap: 20 }}>
                <p>{invite}</p>
                <button
                    onClick={() => {
                        handleDelete(invite)
                    }}
                >
                    Delete
                </button>
            </div>
        )
    }

    async function handleDelete(invite) {
        const res = await axios.delete('/api/invite', {
            data: { inviteString: invite },
        })
        if (res.data.Success) {
            removeInvite(invite)
            toast.success(`Invite ${invite} successfully deleted!`)
        } else {
            toast.error('Something went wrong. Please try again.')
        }
    }

    function removeInvite(invite) {
        let tmp = []
        invites.forEach((e) => {
            if (e.invite !== invite) {
                tmp.push(e)
            }
        })
        setInvites(tmp)
    }

    return (
        <dialog ref={modalRef}>
            {showInvitesModal ? (
                <ToastContainer
                    position="top-center"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="dark"
                />
            ) : (
                <></>
            )}
            <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
                {inviteDivs}
            </div>
            <button
                onClick={() => {
                    setShowInvitesModal(false)
                }}
            >
                Close
            </button>
        </dialog>
    )
}
