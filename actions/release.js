module.exports = ({
    release: (message, channel, client) => {
        client.Messages.deleteMessage(message.id, channel.id)
    },
    clear: (channel, client) => {
        var message = client.Messages.find(m => true); // get any message
        client.Messages.deleteMessage(message.id, channel.id);
    }
})