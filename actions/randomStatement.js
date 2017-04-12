const motivationArray = [
    'You are awesome!',
    'Great job!',
    'Keep it up!',
    "Let's do this!",
    "Appreciate ya!",
    'Never settle!',
    'You can do amazing things!'
]

const quotesArray = [
    'The way to get started is to quit talking and begin doing. -Walt Disney',
    "When you want to succeed as bad as you want to breath, then'll be successful -Eric Thomas",
    "Hard work beats talent when talent doesn't work hard. -Tim Notke",
    "Every great story on the planet happened when someone decided not to give up, but kept going no matter what -Spryte Loriano",
    "Don't stop when you're tired, stop when you're done. -Unknown"
]

const happyGifs = [
    'https://media.giphy.com/media/tdr6m1OVPIqAM/giphy.gif',
    'https://media.giphy.com/media/xSM46ernAUN3y/giphy.gif',
    'https://media.giphy.com/media/3Cm8cxtSHqu6Q/giphy.gif',
    'https://media.giphy.com/media/JWGgsu82QDoEE/giphy.gif',
    'https://media.giphy.com/media/w7dn7xRSHGZUs/giphy.gif'
]

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    motivation: (e) => {
        let index = randomInt(0, motivationArray.length)
        e.message.channel.sendMessage(motivationArray[index])
    },
    quotes: (e) => {
        let index = randomInt(0, quotesArray.length)
        e.message.channel.sendMessage(quotesArray[index])
    },
    happyGifs: (e) => {
        let index = randomInt(0, happyGifs.length)
        e.message.channel.sendMessage(happyGifs[index])
    }
}