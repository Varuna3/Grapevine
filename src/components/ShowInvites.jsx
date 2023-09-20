import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import Modal from './Modal'

export default function ShowInvites({
    showInvitesModal,
    setShowInvitesModal,
    serverId,
    invites,
    setInvites,
}) {
    const [inviteDivs, setInviteDivs] = useState([])

    useEffect(() => {
        let tmp = []
        invites.forEach((e) => {
            tmp = [...tmp, formatInviteDiv(e.invite)]
        })
        setInviteDivs(tmp)
    }, [showInvitesModal, invites])

    function formatInviteDiv(invite) {
        return (
            <div key={invite}>
                <div>
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
        <Modal
            open={showInvitesModal}
            setOpen={setShowInvitesModal}
            title="Invites"
        >
            {showInvitesModal && (
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
            )}
            <div>
                {inviteDivs.length > 0 ? (
                    inviteDivs
                ) : (
                    <strong>No invites yet!</strong>
                )}
            </div>
        </Modal>
    )
}
