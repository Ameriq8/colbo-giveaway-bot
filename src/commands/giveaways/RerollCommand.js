const BaseCommand = require('../../utils/structures/BaseCommand')
const Giveaway = require('../../models/giveaways')

module.exports = class EndCommand extends BaseCommand {
    constructor() {
        super('reroll', 'giveaways', [])
    }

    async run(client, message, args) {
        const role = 'giveaway'

        if (!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some(r => r.name === role))
            return message.channel.send('Permissinos' + '`' + role + '`' + '.')

        const messageId = args[0]

        if (!messageId) return message.channel.send('<a:cross:905853526201225276> Please indicate the message id to end the giveaway.')

        const giveaway = await Giveaway.findOne({ messageID: messageId })

        if (!giveaway) return message.channel.send(`<a:cross:905853526201225276> No giveaway found with message Id ${messageId}.`)

        if (!giveaway.ended) return message.channel.send(`<a:cross:905853526201225276> Giveaway with message Id ${messageId} is not ended`)

        client.emit('giveawayReRoll', giveaway)
    }
}
