import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import '../styles/settings-panel.scss'

import Logout from './Logout'
import CreateInvite from './CreateInvite'
import ShowInvites from './ShowInvites'
import EditUser from './EditUser'
import Button from './Button'
import Grid from './Grid'

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
        <>
            <div className="settings-panel" data-open={showSettings}>
                <h1>Server Settings</h1>
                <Grid>
                    <CreateInvite name={currentServer.name} />
                    <Button
                    variant="light"
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
                    <ShowInvites
                        showInvitesModal={showInvitesModal}
                        setShowInvitesModal={setShowInvitesModal}
                        serverId={currentServer.id}
                        invites={invites}
                        setInvites={setInvites}
                    />
                    <Button
                        variant="danger"
                        action={async () => {
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
                    </Button>
                </Grid>
                <h1>User Settings</h1>
                <Grid>
                    {isEditing ? (
                        <>
                            <EditUser
                                username={username}
                                imageURL={imageURL}
                                email={email}
                                setUsername={setUsername}
                                setProfileImage={setProfileImage}
                                setProfileEmail={setProfileEmail}
                                setIsEditing={setIsEditing}
                            />
                        </>
                    ) : (
                        <>
                        <Grid>
                        <img src={imageURL} />
                            Username: {username}
                            <br />
                            Email: {email}
                        </Grid>
                        <Grid>
                            <Button
                                variant="light"
                                    action={() => {
                                        setIsEditing(true)
                                    }}
                                >
                                    Edit Profile
                                </Button>
                                <Logout
                                    setShowModal={setShowModal}
                                    setMessages={setMessages}
                                    setCurrentServer={setCurrentServer}
                                    setServerList={setServerList}
                                />
                        </Grid>
                        </>
                    )}
                </Grid>
            </div>
        </>
    )
}
