import axios from 'axios'
import { toast } from 'react-toastify'

export default function CreateInvite({ name }) {
    return (
        <>
            <button
                onClick={async () => {
                    if (name) {
                        const { data } = await axios.put('/api/invite', {
                            name,
                        })
                        if (data.Success) {
                            toast.success(
                                `Invite ${data.Success} successfully created.`
                            )
                            setInvite(data.Success)
                        } else {
                            toast.error(
                                'Something went catastrophically wrong.'
                            )
                        }
                    } else {
                        toast.error('Please select a server.')
                    }
                }}
            >
                Create Invite
            </button>
        </>
    )
}
