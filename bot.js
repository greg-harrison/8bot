const Discordie = require('discordie')
const consoleResponses = require('./actions/consoleResponses')
const randomStatement = require('./actions/randomStatement')
const responses = require('./actions/responses')
const ship = require('./actions/ship')
var Events = Discordie.Events

const client = new Discordie()
const token = process.env.token

client.connect({token})
client.autoReconnect().enabled(true)

client.Dispatcher.on(Event.DISCONNECTED, e => {
    consoleResponses.disconnected(e)
})

client.Dispatcher.on(Events.GATEWAY_READY, e => {
    consoleResponses.awake(client)
})

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    const eightBot = client.Users.find(u => u.username == "8bot");
    const message = e.message.content
    var messageArray = message.split(" ") 

    if (eightBot.isMentioned(e.message)) {
        if (messageArray.length === 1) {
            responses.helloWorld(e)
        } else {
            responses.whatAStory(e, 'Mark')
        }
    }

    // Any time a message comes in that wasn't posted by 8Bot
    if (!e.message.author.bot) {
        switch (true) {
            // Triggered by commands
            case (message.indexOf('!ship') != -1):
                // TODO: Algorithm for choosing the ship percentage needs to be updated
                ship.ship(e);           
                break;
            case (message.indexOf('!quote') != -1):
                randomStatement.quotes(e);
                break;
            case (message.indexOf('!motivation') != -1):
                randomStatement.motivation(e);
                break;

            // Triggered by events or circumstances
            case (messageArray.length >= 100):
                responses.whatAStory(e, 'Mark');
                break;

            default:
                console.log(e)
                break;
        }
    }
})