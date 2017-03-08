const randomStatement = require('./actions/randomStatement')
const ship = require('./actions/ship')

var Discordie = require('discordie')
var Events = Discordie.Events

const client = new Discordie()
const token = process.env.token

client.connect({
    token: token
})

client.Dispatcher.on(Events.GATEWAY_READY, e => {
    console.log(client.User.username + ' - Current Status: ' + client.User.status)
})

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    if (!e.message.author.bot) {
        switch (true) {
            case (e.message.content.indexOf('!ship') != -1):
                // TODO: Algorithm for choosing the ship percentage needs to be updated
                ship.ship(e);           
                break;

            case (e.message.content.indexOf('!quote') != -1):
                randomStatement.quotes(e);
                break;

            case (e.message.content.indexOf('!motivation') != -1):
                randomStatement.motivation(e);
                break;

            default:
                console.log(e)
                break;
        }
    }
})