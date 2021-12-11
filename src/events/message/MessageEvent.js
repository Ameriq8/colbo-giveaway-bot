const BaseEvent = require('../../utils/structures/BaseEvent')
const config = require('../../../slappey.json')
const Discord = require('discord.js')

module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('messageCreate')
    }

    async run(client, message) {
        try {
            // if (message.author.bot) return;
            if (!message.guild || !message.channel || message.author.bot) return
            if (message.channel.partial) await message.channel.fetch()
            if (message.partial) await message.fetch()

            const prefix = config.prefix
            const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})`)
            if (!prefixRegex.test(message.content)) return
            const [, mPrefix] = message.content.match(prefixRegex)
            const args = message.content.slice(mPrefix.length).trim().split(/ +/).filter(Boolean)
            const cmd = args.length > 0 ? args.shift().toLowerCase() : null
            if (!cmd) {
                if (mPrefix.includes(client.user.id)) {
                    message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setColor('BLACK')
                                .setFooter(client.user.tag, client.user.avatarURL())
                                .setTitle(`:thumbsup: **My Prefix here, is __\`${prefix}\`__**`)
                        ]
                    })
                }
                return
            }

            /*if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
      .slice(client.prefix.length)
      .trim(), 
      .split(/\s+/);*/
            const command = client.commands.get(cmd)

            if (command) {
                command.run(client, message, args)
            }
        } catch (err) {
            if (err.code === 50007) return
            console.log(err)
        }
    }
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
