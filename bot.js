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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    const message = e.message.content
    if (!e.message.author.bot) {
        if(e.message.content === '!PING') {
            e.message.channel.sendMessage('PONG')
        }
        if(e.message.content.indexOf('!ship') >= 0) {
            var messageArray = message.split(" ") 
            var newMsg = messageArray[1] + ' and ' + messageArray[2]
            if (messageArray[1] === 'me') {
                messageArray[1] = e.message.author.username
                newMsg = messageArray[1] + ' and ' + messageArray[2]
            }
            if (messageArray[2] === ('and' || '/')) {
                newMsg = messageArray[1] + ' and ' + messageArray[3]
            }
            var match = Math.abs(Math.random())
            newMsg += '? They are a '
            newMsg += getRandomInt(0, 100) 
            newMsg += '% match!' 
            e.message.channel.sendMessage(newMsg)
        }
    }
})