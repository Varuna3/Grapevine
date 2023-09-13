import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import '../styles/settings-panel.scss'

import Logout from './Logout'
import CreateInvite from './CreateInvite'
import ShowInvites from './ShowInvites'

export default function SettingsPanel({
    showSettings,
    setShowModal,
    setMessages,
    setCurrentServer,
    setServerList,
    currentServer,
    showInvitesModal,
    setShowInvitesModal,
}) {
    const [marginLeft, setMarginLeft] = useState('100vw')
    const [invites, setInvites] = useState([])

    useEffect(() => {
        showSettings
            ? () => {
                  setMarginLeft('60vw')
              }
            : () => {
                  setMarginLeft('100vw')
              }
    }, [showSettings])

    return (
        <>
            <div
                className="settings-panel"
                style={
                    showSettings
                        ? { marginLeft: 'calc(100vw - 320px)' }
                        : { marginLeft: '100vw' }
                }
            >
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
