import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import '../styles/settings-panel.scss'

import Logout from './Logout'
import CreateInvite from './CreateInvite'
import ShowInvites from './ShowInvites'
import EditUser from './EditUser'
import Button from './Button'
import Sidebar from './Sidebar'

export default function SettingsPanel(props) {
    const {
        showSettings,
        setShowSettings,
        setShowModal,
        setMessages,
        setCurrentServer,
        setServerList,
        currentServer,
        showInvitesModal,
        setShowInvitesModal,
        username,
        imageURL,
        email,
        setUsername,
        setProfileImage,
        setProfileEmail,
    } = props
    const [isEditing, setIsEditing] = useState(false)
    const [invites, setInvites] = useState([])

    return (
        <div className="settings-panel">
            <Sidebar open={showSettings} setOpen={setShowSettings} align="end">
                {currentServer.name && (
                    <div className="settings-panel-server">
                        <h1>{currentServer.name} Settings</h1>
                        <Button
                            variant="info"
                            action={async () => {
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
                        </Button>
                        <CreateInvite name={currentServer.name} />
                        <Button
                            variant="danger"
                            action={async () => {
                                if (currentServer.name) {
                                    const { data } = await axios.delete(
                                        '/api/server',
                                        {
                                            data: { id: currentServer.id },
                                        }
                                    )
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
                        </Button>
                    </div>
                )}
                <div className="settings-panel-user">
                    <h1>User Settings</h1>
                    <div className="settings-panel-profile">
                        <img className="settings-panel-pfp" src={imageURL} />
                        <div>
                            <strong className="settings-panel-username">
                                {username}
                            </strong>
                            <strong className="settings-panel-email">
                                {email}
                            </strong>
                        </div>
                    </div>
                    <Logout
                        setShowModal={setShowModal}
                        setMessages={setMessages}
                        setCurrentServer={setCurrentServer}
                        setServerList={setServerList}
                    />
                    <Button
                        variant="warning"
                        action={() => {
                            setIsEditing(!isEditing)
                        }}
                    >
                        Edit Profile
                    </Button>
                </div>
                {isEditing && (
                    <EditUser
                        username={username}
                        imageURL={imageURL}
                        email={email}
                        setUsername={setUsername}
                        setProfileImage={setProfileImage}
                        setProfileEmail={setProfileEmail}
                        setIsEditing={setIsEditing}
                    />
                )}
            </Sidebar>
            <ShowInvites
                showInvitesModal={showInvitesModal}
                setShowInvitesModal={setShowInvitesModal}
                serverId={currentServer.id}
                invites={invites}
                setInvites={setInvites}
            />
        </div>
    )
}
