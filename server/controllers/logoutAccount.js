// Logout Account: Logs out the currently logged in account.

export default async function logoutAccount(req, res) {
    // Get currently logged in user:
    const username = req.session.user

    // Logout user if currently signed in:
    if (username !== undefined) {
        // Destroy user session:
        await req.session.destroy()

        // Respond with success JSON data:
        res.json({
            Success: `User ${username} successfully logged out.`,
        })
    }
    // Else respond with error JSON data:
    else {
        res.json({
            Error: 'No user is currently logged in.',
        })
    }
}
