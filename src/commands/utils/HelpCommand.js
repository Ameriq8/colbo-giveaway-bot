const BaseCommand = require('../../utils/structures/BaseCommand')
const { MessageEmbed } = require('discord.js')

module.exports = class PingCommand extends BaseCommand {
    constructor() {
        super('help', 'utils', [])
    }

    run(client, message, args, prefix) {
        if (args[0]) {
            const embed = new MessageEmbed()
            const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()))
            if (!cmd) {
                return message.reply({
                    embeds: [embed.setColor('#FFF').setDescription(`No Information found for command **${args[0].toLowerCase()}**`)]
                })
            }
            if (cmd.name) embed.addField('**Command name**', `\`${cmd.name}\``)
            if (cmd.name) embed.setTitle(`Detailed Information about: \`${cmd.name}\``)
            if (cmd.description) embed.addField('**Description**', `\`${cmd.description}\``)
            if (cmd.aliases) embed.addField('**Aliases**', `\`${cmd.aliases.map(a => `${a}`).join('`, `')}\``)
            if (cmd.cooldown) embed.addField('**Cooldown**', `\`${cmd.cooldown} Seconds\``)
            else embed.addField('**Cooldown**', `\`${5} Second\``)
            if (cmd.usage) {
                embed.addField('**Usage**', `\`${prefix}${cmd.usage}\``)
                embed.setFooter('Syntax: <> = required, [] = optional')
            }
            return message.reply({ embeds: [embed.setColor('BLUE')] })
        } else {
            const dev = client.users.cache.get('442032295214579712')
            const embed = new MessageEmbed()
                .setColor('WHITE')
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle('Help Menu')
                .setFooter(`Developed by ${dev.tag}`, dev.displayAvatarURL({ dynamic: true }))
                .addField('Giveaways', '`start`, `end`, `reroll`, `list`')
                .addField('Utils', '`help`, `ping`, `invite`')

            message.reply({ embeds: [embed] })
        }
    }
}
