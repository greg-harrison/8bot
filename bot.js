const Discordie = require('discordie')
const consoleResponses = require('./actions/consoleResponses')
const randomStatement = require('./actions/randomStatement')
const eventCtrl = require('./actions/events')
const responses = require('./actions/responses')
const ship = require('./actions/ship')


// In the future, I will make multiple Mongoose schemas.
    // Notes-to-Self, Use command keep, takes in the name/date/message
    // Session commands, keep track of what commands I try to use while I'm working
    // stuff like that

// At some point, the plan is to build a sibling system that will query the data out of this MongoDB instance and show it in a GUI

var mongoose = require('mongoose')
const MONGO_HOST = (process.env.MONGO_HOST || 'localhost')
const MONGO_PORT = (process.env.MONGO_PORT || '27017')
mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/local`);

const notesSchema = new mongoose.Schema({
    name: String,
    message: String,
    time: Date
});
notesSchema.index({ _id: 1 }, { sparse: true })
mongoose.model('Notes', notesSchema);
var Notes = mongoose.model('Notes');

// testSchema allows the passing of a username and message into the db
// To collect and store other data (such as the use-case of collecting data on Wendy's bathroom habits)
//   We may need to make it slightly more robust, or make a completely separate Schema entirely.
//   I believe schemas are a 1:1 with a particular table (thus, TestSchema generates db.tests in Mongo)

var Events = Discordie.Events
const client = new Discordie({autoReconnect: true})
const token = process.env.token

client.connect({token})

client.Dispatcher.on(Events.DISCONNECTED, e => {
    consoleResponses.disconnected(e)
})

client.Dispatcher.on(Events.GATEWAY_READY, (e) => {
    const guild = client.Guilds.getBy('name', 'Self')
    const eightBit = client.Users.find(u => u.username == "8BitTorrent");

    consoleResponses.awake(client)

    if (guild) {
        const general = guild.textChannels.filter(c => c.name == 'general')[0]
        const notes2self = guild.textChannels.filter(c => c.name == 'notes-to-self')[0]
        if (general) {
            return general.sendMessage("Hey "+ eightBit.mention + ", I'm online and fully operational.")
        }
        if (notes2self) {
            return notes2self.sendMessage("Hey "+ eightBit.mention + ", I'm online. You can store notes to yourself in Mongo by running !keep <text>")
        }
        return console.log('Channel not found')
    }
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
            case (message.indexOf('!mfw') != -1):
                randomStatement.happyGifs(e)
                break;
            case (message.indexOf('!event') != -1):
                eventCtrl.eventController(e);
                break;
            case (message.indexOf('!help') != -1):
                responses.help(e);
                break;
            case (message.indexOf('!keep') != -1):
                var cleanedMessage = message.split(" ").slice(1).join(' ')

                var newTest = new Notes({
                    name: e.message.author.username, 
                    message: cleanedMessage,
                    time: e.message.timestamp 
                })

                newTest.save((err)=>{
                    if(err) {
                        responses.test(e, err)
                    } else {
                        responses.test(e, 'Message written to database')
                    }
                })
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