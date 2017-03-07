var Discordie = require('discordie')
var Events = Discordie.Events

const client = new Discordie()
const token = process.env.token

console.log('token', token)
client.connect({
    token: token
})

client.Dispatcher.on(Events.GATEWAY_READY, e => {
    console.log('Connected as: ' + client.User.username)
})

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    if(e.message.content === 'PING') {
        e.message.channel.sendMessage('PONG')
    }
})