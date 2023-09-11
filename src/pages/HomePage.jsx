// Home Page: Page for displaying and creating new server messages.

import { useState, useEffect } from 'react'
import axios from 'axios'
import InputArea from '../components/InputArea'
import Messages from '../components/Messages'
import LoginModal from '../components/LoginModal'
import CreateServerModal from '../components/CreateServerModal'
import ServerList from '../components/ServerList'
import CreateInvite from '../components/CreateInvite'
import ShowInvites from '../components/ShowInvites'

import { ToastContainer, toast } from 'react-toastify'

import '../styles/home-page.scss'
import Logout from '../components/Logout'

export default function HomePage({
    messages,
    setMessages,
    currentServer,
    setCurrentServer,
}) {
    const [username, setUsername] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showServerModal, setShowServerModal] = useState(false)
    const [showInvitesModal, setShowInvitesModal] = useState(false)
    const [serverList, setServerList] = useState([])
    const [invites, setInvites] = useState([])
    // const [currentServer, setCurrentServer] = useState({})

    useEffect(() => {
        axios.get('/api/username').then(({ data }) => {
            if (data.Success) {
                setUsername(data.Success)
                getAllServers()
            } else if (data.Error) {
                // Alert user there was an error
                setShowModal(true)
                console.log(data.Error)
            }
        })
    }, [showModal, showServerModal])

    async function getAllServers() {
        await axios.get('/api/server/getall').then((res) => {
            if (res.data.Success[0]) {
                setServerList(res.data.Success)
            }
        })
    }

    async function handleSubmit(message) {
        const { data } = await axios.put('/api/message', {
            server: currentServer.name,
            message,
        })
        if (data.Success) {
            socket.emit('client message', {
                username,
                message,
                server: currentServer.id,
            })
        } else {
            socket.emit('client message', {
                username,
                message: "I think I want a pet unicorn. I'll name him Terry.",
                server: currentServer.id,
            })
        }
    }

    return (
        <main className="home-page">
            {/* only display toastcontainer if no modals are blurring the background */}
            {!showModal && !showServerModal && !showInvitesModal ? (
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
            <LoginModal
                showModal={showModal}
                setShowModal={setShowModal}
                setUsername={setUsername}
                username={username}
            />
            <button
                onClick={() => {
                    setShowServerModal(true)
                }}
            >
                Create Server
            </button>
            <CreateServerModal
                showServerModal={showServerModal}
                setShowServerModal={setShowServerModal}
            />
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
            <Logout setShowModal={setShowModal} setMessages={setMessages} />
            <ServerList
                serverList={serverList}
                setCurrentServer={setCurrentServer}
            />
            <Messages
                messages={messages}
                setMessages={setMessages}
                server={currentServer}
            />
            <InputArea
                callback={(message) => {
                    handleSubmit(message)
                }}
            />
        </main>
    )
}
