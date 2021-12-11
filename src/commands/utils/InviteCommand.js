const BaseCommand = require('../../utils/structures/BaseCommand')
const { MessageEmbed } = require('discord.js')

module.exports = class PingCommand extends BaseCommand {
    constructor() {
        super('invite', 'utils', [])
    }

    run(client, message) {
        let embed = new MessageEmbed()
            //.setAuthor(`Request by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setColor('#FFFFFF')
            .setDescription(`[Invite](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=138781518912)`)
            .setFooter(`© ${client.user.username}, All Rights Reserved 2021`, client.user.displayAvatarURL())
        message.author.send({ embeds: [embed] })
        message.react('905853645780840459')
    }
}
