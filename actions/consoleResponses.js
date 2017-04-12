module.exports = {
    awake: (client) => {
        const guild = client.Guilds.getBy('name', 'Self')
        console.log(client.User.username + '@'+ guild + ' - Current Status: ' + client.User.status)
    },
    disconnected: (e) => {
        console.log(e.error.message)
    }
}