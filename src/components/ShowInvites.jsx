import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import Button from './Button'
import Modal from './Modal'

import '../styles/invites.scss'

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
            <div className="invites-item" key={invite}>
                <span>{invite}</span>
                <Button
                    variant="danger"
                    action={() => {
                        handleDelete(invite)
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                </Button>
                <Button
                    variant="info"
                    action={() => {
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
                </Button>
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
            <div className="invites">
                {inviteDivs.length > 0 ? (
                    inviteDivs
                ) : (
                    <strong>No invites yet!</strong>
                )}
            </div>
        </Modal>
    )
}
