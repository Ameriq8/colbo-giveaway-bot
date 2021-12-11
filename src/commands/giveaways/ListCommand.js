const BaseCommand = require('../../utils/structures/BaseCommand')
const Giveaway = require('../../models/giveaways')
const { MessageEmbed } = require('discord.js')

module.exports = class EndCommand extends BaseCommand {
    constructor() {
        super('list', 'giveaways', [])
    }

    async run(client, message) {
        try {
            const role = 'giveaway'

            if (!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some(r => r.name === role))
                return message.channel.send('Permissinos' + '`' + role + '`' + '.')

            const giveaways = await Giveaway.find({ ended: false })

            let embed = new MessageEmbed()
                .setTitle('Giveaways List')
                .setDescription(
                    giveaways.length >= 1
                        ? giveaways
                              .map((us, i) => `**${++i})** [${us.prize}](https://discord.com/channels/${us.guildID}/${us.channelID}/${us.messageID})`)
                              .join('\n')
                        : 'Not found any giveaway.'
                )
                .setColor('#000')

                .setFooter(client.user.tag, client.user.avatarURL())

            message.channel.send({ embeds: [embed] })
        } catch (err) {
            console.error(err)
        }
    }
}
