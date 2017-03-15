const responses = require('./responses')

const eventController = (e) => {
    const message = e.message.content

    const newEvent = (e) => {
        responses.test(e, 'Hello New')
    }

    switch(true) {
        case (message.indexOf('new') != -1):
            newEvent(e)
            break;

        case (message.indexOf('upcoming') != -1):
            responses.test(e, 'Hello Upcoming')
            break;

        case (message.indexOf('all') != -1):
            responses.test(e, 'Hello All')
            break;

        default:
            responses.test(e, 
            '```Command not recognized: Supported Commands\n!event new \n!event upcoming \n!event all```')
            break;
    }

}

module.exports = {
    eventController: eventController,
    newEvent: eventController.newEvent
}