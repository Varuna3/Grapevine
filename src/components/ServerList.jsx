const ServerList = ({ serverList, setCurrentServer }) => {
    return (
        <>
            {serverList && (
                <>
                    {serverList.map((server) => {
                        return (
                            <div
                                key={server.id}
                                onClick={() => {
                                    setCurrentServer(server)
                                }}
                            >
                                {server.name}
                            </div>
                        )
                    })}
                </>
            )}
        </>
    )
}

export default ServerList
