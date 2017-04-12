const commands = [
    '```',
        'COMMANDS\n',
        '!ship',
        '!quote',
        '!motivation',
        '!mfw',
        '!keep *under-development',
        '!giphy *under-development',
        '!event *under-development',
    '```'
]

module.exports = {
    awake: (e) => {
        console.log(e)
    },
    helloWorld: (e) => {
        e.message.channel.sendMessage('Hello World')
    },
    whatAStory: (e, user) => {
        e.message.channel.sendMessage('What a story, ' + user)
    },
    help: (e) => {
        e.message.channel.sendMessage(commands.join('\n'))
    },
    test: (e, text) => {
        console.log('text', text)
        e.message.channel.sendMessage(text)
    },
    testStatus: (e) => {
        e.message.channel.sendMessage('')
    }
}