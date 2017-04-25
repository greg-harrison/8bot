module.exports = ({
    release: (message, channel, client) => {
        client.Messages.deleteMessage(message.id, channel.id)
    },
    clear: (channel, client) => {
        client.Messages.purgeChannelCache(channel.id)
    }
})