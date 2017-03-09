module.exports = {
    helloWorld: (e) => {
        e.message.channel.sendMessage('Hello World')
    },
    whatAStory: (e, user) => {
        e.message.channel.sendMessage('What a story, ' + user)
    }
}