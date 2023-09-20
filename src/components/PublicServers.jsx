import { useState, useRef, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'

import Button from './Button'
import Modal from './Modal'

import '../styles/public-servers.scss'

const PublicServers = ({
    showAllServersModal,
    setShowAllServersModal,
    publicServers,
}) => {
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
        <Modal
            open={showAllServersModal}
            setOpen={setShowAllServersModal}
            title="Public Servers"
        >
            <div className="public-servers">
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
                {publicServers.length > 0 ? (
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
                    ))
                ) : (
                    <strong>Currently no public servers.</strong>
                )}
            </div>
        </Modal>
    )
}

export default PublicServers
