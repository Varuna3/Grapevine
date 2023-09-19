import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

import Button from './Button'
import '../styles/public-servers.scss'
import { toast, ToastContainer } from 'react-toastify'

const PublicServers = ({
    showAllServersModal,
    setShowAllServersModal,
    publicServers,
}) => {
    const modalRef = useRef()

    useEffect(() => {
        if (!modalRef.current) return

        if (showAllServersModal) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
    }, [showAllServersModal])

    async function handleJoin(name) {
        const { data } = await axios.post(`/api/server/addUser`, {
            serverName: name,
            isAdmin: false,
        })
        if (data.Success) {
            {
                toast.success(
                    'Success! Refresh your page to see the new server.'
                )
            }
        }
    }

    return (
        <>
            <dialog ref={modalRef} className="public-servers">
                <button
                    className="public-servers-close"
                    onClick={() => {
                        setShowAllServersModal(false)
                    }}
                >
                    &times;
                </button>
                {showAllServersModal && (
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
                <h1>Public Servers</h1>
                {publicServers &&
                    publicServers.map((server) => (
                        <div key={server.id} className="public-servers-item">
                            <img src={server.imageURL} />
                            <span>{server.name}</span>
                            <Button
                                variant="success"
                                action={() => {
                                    handleJoin(server.name)
                                }}
                            >
                                Join
                            </Button>
                        </div>
                    ))}
            </dialog>
        </>
    )
}

export default PublicServers
