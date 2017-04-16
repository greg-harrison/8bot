const request = require('superagent') 

const giphyPublicApiKey = 'dc6zaTOxFJmzC'

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    search: (e, query) => {
        let buildCall = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${giphyPublicApiKey}&limit=5`   

        let response = ''

        request
            .get(buildCall)
            .end((error, res)=>{
                response = res.body.data[randomInt(0,4)].url
                let sendRes = response.length >= 1?response:'Error'
                e.message.channel.sendMessage(sendRes)
            })

    }
}