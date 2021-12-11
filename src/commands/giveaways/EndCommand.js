const BaseCommand = require('../../utils/structures/BaseCommand')
const Giveaway = require('../../models/giveaways')

module.exports = class EndCommand extends BaseCommand {
    constructor() {
        super('end', 'giveaways', [])
    }

    async run(client, message, args) {
        try {
            const role = 'giveaway'

            if (!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some(r => r.name === role))
                return message.channel.send('Permissinos' + '`' + role + '`' + '.')

            const messageId = args[0]

            if (!messageId) return message.channel.send('<a:cross:905853526201225276> Please indicate the message id to end the giveaway.')

            const giveaway = await Giveaway.findOne({ messageID: messageId })
            // console.log(giveaway)

            if (!giveaway) return message.channel.send(`<a:cross:905853526201225276> No giveaway found with message Id ${messageId}.`)

            if (giveaway.ended) return message.channel.send(`<a:cross:905853526201225276> Giveaway with message Id ${messageId} is already ended`)

            giveaway.ended = true
            giveaway.save({}, err => {
                if (err) throw new Error(err)
                client.emit('giveawayEnd', giveaway)
            })
        } catch (err) {
            console.error(err)
        }
    }
}
