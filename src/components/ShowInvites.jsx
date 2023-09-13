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
            <div
                key={invite}
                style={{
                    display: 'flex',
                    gap: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p>{invite}</p>
                    <button
                        onClick={() => {
                            handleDelete(invite)
                        }}
                    >
                        Delete
                    </button>
                </div>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(invite)
                        toast.success(`${invite} copied!`)
                    }}
                    style={{ height: 50, width: 50 }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-clipboard2"
                        viewBox="0 0 16 16"
                    >
                        <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z" />
                        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                    </svg>
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
        <dialog ref={modalRef} style={{ width: 300 }}>
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
                {inviteDivs.length > 0 ? inviteDivs : <h1>No invites yet!</h1>}
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
