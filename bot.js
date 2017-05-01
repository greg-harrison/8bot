const Discordie = require('discordie')
const consoleResponses = require('./actions/consoleResponses')
const randomStatement = require('./actions/randomStatement')
const releaseCtrl = require('./actions/release')
const giphy = require('./actions/giphy')
const eventCtrl = require('./actions/events')
const responses = require('./actions/responses')
const ship = require('./actions/ship')
const _ = require('lodash')

// TODO: Add a module for querying Mongo that takes in a command like /last 2 notes
        // Parse out 2 as the number of records to return from the Notes collection
        // This would add greater flexibility, since I would be able to query new collections as I make them.

// In the future, I will make multiple Mongoose schemas.
    // Notes-to-Self, Use command Keep, takes in the name/date/message
    // Session commands, keep track of what commands I try to use while I'm working
    // stuff like that

// At some point, the plan is to build a sibling system that will query the data out of this MongoDB instance and show it in a GUI

var mongoose = require('mongoose')
const MONGO_HOST = (process.env.MONGO_HOST || 'localhost')
const MONGO_PORT = (process.env.MONGO_PORT || '27017')
mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/local`);

const BOT_MODE = (process.env.BOT_MODE || 'Dev')

const notesSchema = new mongoose.Schema({
    name: String,
    message: String,
    time: Date
});
notesSchema.index({ _id: 1 }, { sparse: true })
mongoose.model('Notes', notesSchema);
const Notes = mongoose.model('Notes');

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
        const release = guild.textChannels.filter(c => c.name == 'release')[0]
        const botStatus = guild.textChannels.filter(c => c.name == 'bot-status')[0]

        if (botStatus) {
            return botStatus.sendMessage("Hey "+ eightBit.mention + ", I'm online and fully operational. Running in " + BOT_MODE)
        }
        return console.log('Channel not found')
    }
})
format = (seconds) => {
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return hours + ' hours and ' + minutes + ' minutes';
}

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    const guild = client.Guilds.getBy('name', 'Self')
    const release = guild.textChannels.filter(c => c.name == 'release')[0]
    const status = guild.textChannels.filter(c => c.name == 'bot-status')[0]
    const eightBot = client.Users.find(u => u.username == "8bot");
    const message = e.message.content;

    const messageInStatus = (e.message.channel_id === status.id); 
    const messageInRelease = (e.message.channel_id === release.id); 

    var messageArray = message.split(" ") 

    if (guild && release) {
        if (e.message.content.toLowerCase().indexOf('!clear') != -1){
            releaseCtrl.clear(release, client)
        }
        else if(e.message.channel_id === release.id){
            releaseCtrl.release(e.message, release, client)
        }
    }

    if (eightBot.isMentioned(e.message)) {
        if (messageArray.length === 1) {
            responses.helloWorld(e)
        } else if (message.toLowerCase().indexOf('bye') != -1) {
            responses.bye(e)
        } else if (message.toLowerCase().indexOf('where are you?') != -1) {
            responses.whereAmI(e)
        } else {
            responses.whatAStory(e, 'Mark')
        }
    }

    // Any time a message comes in that wasn't posted by 8Bot
    if (!e.message.author.bot) {
        switch (true) {
            // Triggered by commands
            case ((message.toLowerCase().indexOf('!ship') != -1)):
                // TODO: Algorithm for choosing the ship percentage needs to be updated
                ship.ship(e);           
                break;
            case ((message.toLowerCase().indexOf('!quote') != -1)):
                randomStatement.quotes(e);
                break;
            case ((message.toLowerCase().indexOf('!motivation') != -1)):
                randomStatement.motivation(e);
                break;
            case ((message.toLowerCase().indexOf('!mfw') != -1)):
                messageArray.splice(0,1)
                let query = messageArray.join('+')
                giphy.search(e, query)
                break;
            case ((message.toLowerCase().indexOf('!event') != -1)):
                eventCtrl.eventController(e);
                break;
            case ((message.toLowerCase().indexOf('!help') != -1)):
                responses.help(e);
                break;
            case ((message.toLowerCase().indexOf('!uptime') != -1)): {
                let uptime = Math.floor(process.uptime())
                responses.test(e, `I've been up for ${format(uptime)}`)
                break;
            }
            case ((message.toLowerCase().indexOf('!ip') != -1)):
                responses.whereAmI(e);
                break;
            case ((message.toLowerCase().indexOf('!query') != -1)):

                Notes.find({name: '8BitTorrent'})
                     .limit(10)
                     .select('name message time')
                     .sort('-time')
                     .exec((err, res) => {
                        if (err) return handleError(err);
                        var mappedArray = _.map(res, (note, index) => {
                            let formattedTime = note.time.toDateString()
                            let queryResponse = `${formattedTime} : ${note.name} stored '${note.message}' in Notes`
                            responses.test(e, queryResponse)
                        })
                    })
                break;

            case ((message.toLowerCase().indexOf('!keep') != -1)):
                var cleanedMessage = message.split(" ").slice(1).join(' ')

                var newTest = new Notes({
                    name: e.message.author.username, 
                    message: cleanedMessage,
                    time: e.message.timestamp 
                })

                newTest.save((err)=>{
                    if(err) {
                        responses.test(e, `:x: ${err}`)
                    } else {
                        responses.test(e, ':white_check_mark: Message written to database')
                    }
                })
                break;

            case ((message.toLowerCase().indexOf('!last') != -1)):
                var shortenedMessage = message.split(" ").slice(1)
                let num, collection

                if (shortenedMessage.length >= 2) {
                    num = Math.floor(shortenedMessage[0])
                    collection = shortenedMessage[1]
                } 

                let response = Note.limit(num).exec((res)=>{
                    console.log(res)
                })

                break;

            // Triggered by events or circumstances
            case (messageArray.length >= 100):
                responses.whatAStory(e, 'Mark');
                break;

            case (messageInStatus && (message.toLowerCase().indexOf('uptime') != -1)): {
                let uptime = Math.floor(process.uptime())
                responses.test(e, `I've been up for ${format(uptime)}`)
                break;
            }
            case (messageInStatus && (message.toLowerCase().indexOf('where are you') != -1)): {
                responses.whereAmI(e)
                break;
            }

            case(messageInRelease && (message.toLowerCase().indexOf('clear') != -1)): {
                releaseCtrl.release(e.message, release, client)
                responses.test(e, 'cleared')
            }

            default:
                console.log(e)
                break;
        }
    }
})