module.exports = {
    awake: (client) => {
        console.log(client.User.username + ' - Current Status: ' + client.User.status)
    }
}