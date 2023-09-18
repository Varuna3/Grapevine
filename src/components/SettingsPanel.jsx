import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import '../styles/settings-panel.scss'

import Logout from './Logout'
import CreateInvite from './CreateInvite'
import ShowInvites from './ShowInvites'

export default function SettingsPanel(props) {
    const {
        showSettings,
        setShowModal,
        setMessages,
        setCurrentServer,
        setServerList,
        currentServer,
        showInvitesModal,
        setShowInvitesModal,
    } = props

    const [invites, setInvites] = useState([])

    return (
        <>
            <div className="settings-panel" data-open={showSettings}>
                <h1>Server Settings</h1>
                <CreateInvite name={currentServer.name} />
                <button
                    onClick={async () => {
                        if (currentServer.id) {
                            setShowInvitesModal(true)
                            const { data } = await axios.get(
                                `/api/invites/${currentServer.id}`
                            )
                            setInvites(data.Success)
                        } else {
                            toast.error('Please select a server.')
                        }
                    }}
                >
                    Show Invites
                </button>
                <ShowInvites
                    showInvitesModal={showInvitesModal}
                    setShowInvitesModal={setShowInvitesModal}
                    serverId={currentServer.id}
                    invites={invites}
                    setInvites={setInvites}
                />
                <button
                    style={{ color: 'red' }}
                    onClick={async () => {
                        if (currentServer.name) {
                            const { data } = await axios.delete('/api/server', {
                                data: { id: currentServer.id },
                            })
                            if (data.Success) {
                                toast.success(
                                    `Server '${currentServer.name}' deleted. Refresh to see it disappear.`
                                )
                            } else {
                                toast.error('Something went wrong.')
                            }
                        } else {
                            toast.error('Please select a server.')
                        }
                    }}
                >
                    Delete Server
                </button>
                <h1>User Settings</h1>
                <Logout
                    setShowModal={setShowModal}
                    setMessages={setMessages}
                    setCurrentServer={setCurrentServer}
                    setServerList={setServerList}
                />
            </div>
        </>
    )
}
