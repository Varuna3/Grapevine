import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

import Button from './Button'
import '../styles/public-servers-modal.scss'

const PublicServers = ({showAllServersModal, setShowAllServersModal, publicServers}) => {
    const modalRef = useRef()

    useEffect(() => {
        axios.get('/api/server/getpubservers').then(({data}) => {
            console.log('DATA', data)
        })
        if (!modalRef.current) return

        if (showAllServersModal) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
    }, [showAllServersModal])

    const handleJoin = () => {
        console.log('JOINED!')
    }

    return (
    <>
        <dialog ref={modalRef} className="public-server-modal">
            <Button variant="danger" action={() => {setShowAllServersModal(false)}}>X</Button>
            <h2>Public Servers</h2>
            {publicServers && (
                <>
                    {publicServers.map((server) => {
                        return (
                        <div key={server.id}>
                            <img src={server.imageURL} style={{height: 100, borderRadius: 10}}/>
                            {server.name}
                            <Button variant="success" action={handleJoin}>
                                Join
                            </Button>
                        </div>
                        )
                    })}
                </>
            )}
        </dialog>
    </>
    )
}

export default PublicServers