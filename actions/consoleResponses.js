module.exports = {
    awake: (client) => {
        console.log(client.User.username + ' - Current Status: ' + client.User.status)
    },
    disconnected: (e) => {
        console.log(e.error.message)
    }
}