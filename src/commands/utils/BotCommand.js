const BaseCommand = require('../../utils/structures/BaseCommand')
const { MessageEmbed, version } = require('discord.js')
const os = require('os')
const ms = require('ms')

module.exports = class PingCommand extends BaseCommand {
    constructor() {
        super('bot', 'utils', [])
    }

    run(client, message) {
        const infobot = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .addField('> 👾 Versions', `**NodeJS: **\` v12.18.0 \`\n**Discord.js: **\` v${version} \`\n**Bot Version: **\`1.1.1\``, true)
            .addField(
                '> 🙂 Leaderboard',
                `**Servers: **[${client.guilds.cache.size}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=138781518912) \n**Users: ** [${client.users.cache.size}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=138781518912)\n**Channels: **[${client.channels.cache.size}](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=138781518912)`,
                true
            )
            .addField(
                '> 🗻 About',
                `**Plateforem: **\`${os.type()} ${os.arch()}bit \`\n**CPU: **\`${
                    os.cpus().map(i => `${i.model}`)[0]
                } \`\n**Bot Language: **\` Javascript \` \n**Bot Developers: ** <@442032295214579712>`
            )
            .addField(
                '> 🦿Processor',
                `**Ram: **\` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB \`\n**Api Latence: **\` ${Math.round(
                    client.ws.ping
                )}ms \``,
                true
            )
            .addField(
                '> 🌟 Uptime Engien',
                `**\` ${Math.round(client.uptime / (1000 * 60 * 60))}h \`** **\` ${Math.round(client.uptime / (1000 * 60)) % 60}m \`** **\` ${
                    Math.round(client.uptime / 1000) % 60
                }s \`**\n** ${ms(client.uptime, { long: true })}** `,
                true
            )
            .addField(
                '> 🔗 • __Links__',
                `[Bot Invite](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) | [Support Server](https://discord.gg/7YREmU5)`
            )
            .setColor(client.user.displayHexColor)

        message.channel.send({ embeds: [infobot] })
    }
}
