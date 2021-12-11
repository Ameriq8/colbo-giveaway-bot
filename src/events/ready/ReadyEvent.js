const BaseEvent = require('../../utils/structures/BaseEvent')

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready')
    }
    async run(client) {
        // Set the client user's presence
        client.user.setPresence({ activities: [{ name: '??help' }], status: 'dnd' })

        console.log(client.user.tag + ' has logged in.')
    }
}
