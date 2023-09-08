const ServerList = ({serverList}) => {

    return (
        <>
            {serverList &&
            <>
                {serverList.map((server) => {
                    return (
                        <div key={server.id}>{server.name}</div>
                    )
                })}
            </>
            }
        </>
    )

}

export default ServerList