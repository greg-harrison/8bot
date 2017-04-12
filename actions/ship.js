function randomInt(min, max) {
    // TODO: Need to rework this
        // Currently it's returning single-digit values.
        // Need to tweak the algorithm when I have a chance
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    ship: (e) => {
        const message = e.message.content
        var messageArray = message.split(" ") 

        var newMsg = messageArray[1] + ' and ' + messageArray[2]
        if (messageArray[1] === 'me') {
            messageArray[1] = e.message.author.username
            newMsg = messageArray[1] + ' and ' + messageArray[2]
        }
        if (messageArray[2] === ('and' || '/')) {
            newMsg = messageArray[1] + ' and ' + messageArray[3]
        }
        newMsg += '? They are a '
        newMsg += randomInt(messageArray[1].length, messageArray[2].length) 
        newMsg += '% match!' 
        e.message.channel.sendMessage(newMsg)
    }
}