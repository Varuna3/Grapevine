import axios from 'axios'
import { toast } from 'react-toastify'
import Button from './Button'

export default function CreateInvite({ name }) {
    return (
        <Button
            variant="success"
            action={async () => {
                if (name) {
                    const { data } = await axios.put('/api/invite', {
                        name,
                    })
                    if (data.Success) {
                        toast.success(
                            `Invite ${data.Success} successfully created.`
                        )
                    } else {
                        toast.error('Something went catastrophically wrong.')
                    }
                } else {
                    toast.error('Please select a server.')
                }
            }}
        >
            Create Invite
        </Button>
    )
}
