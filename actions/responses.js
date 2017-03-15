module.exports = {
    helloWorld: (e) => {
        e.message.channel.sendMessage('Hello World')
    },
    whatAStory: (e, user) => {
        e.message.channel.sendMessage('What a story, ' + user)
    },
    test: (e, text) => {
        console.log('text', text)
        e.message.channel.sendMessage(text)
    }
}