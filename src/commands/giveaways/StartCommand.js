const BaseCommand = require('../../utils/structures/BaseCommand')
const Giveaway = require('../../models/giveaways')
const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = class TestCommand extends BaseCommand {
    constructor() {
        super('start', 'giveaways', ['gstart'])
    }

    async run(client, message, args) {
        try {
            const role = 'Giveaways'

            if (!message.member.permissions.has('MANAGE_GUILD') && !message.member.roles.cache.some(r => r.name === role))
                return message.channel.send('You need these Permissions `MANAGE_MESSAGES` or giveaway role')

            let duration = args[0]

            if (!duration || isNaN(ms(duration)))
                return message.channel
                    .send(
                        '<a:Cross:905853526201225276> Please indicate the duration of the giveaway. Arguments available `s` for seconds, `m` for minutes, `h` hourly and `d` for the days. Example `10m`.'
                    )
                    .catch(err => {
                        if (err.code === 50007) return
                        console.log(err)
                    })

            let winnersCount = args[1]

            if (!winnersCount || isNaN(winnersCount))
                return message.channel
                    .send('<a:Cross:905853526201225276> Please indicate the number of winners. Example `1` for one winner or `2` for two winners.')
                    .catch(err => {
                        if (err.code === 50007) return
                        console.log(err)
                    })

            let giveawayForThisRole = args[2]

            if (!giveawayForThisRole) {
                return message.channel.send(
                    '<a:cross:905853526201225276> Please indicate the array of roles. Example `["Hi"]` for one winner or `2` for two winners.'
                )
            }

            console.log(giveawayForThisRole)

            let prize = args.slice(3).join(' ')

            if (!prize)
                return message.channel.send('<a:Cross:905853526201225276> Please indicate the prize to be won. Example `a nitro`.').catch(err => {
                    if (err.code === 50007) return
                    console.log(err)
                })

            let start = new Date().getTime()
            let end = new Date().getTime() + ms(duration)

            let embed = new MessageEmbed()
                .setTitle(`:gift: ${prize}`)
                .setDescription(
                    `React with <:react:905853645780840459> to participate\n__**Information**__\n<:dot:905834850253152337> Winner(s): ${winnersCount}\n<:dot:905834850253152337> Hosted by: ${
                        message.author
                    }\n<:dot:905834850253152337> End: <t:${Math.round(end / 1000)}:R>\n\n__**Giveaway For**__\n${
                        giveawayForThisRole ? giveawayForThisRole : 'Not Decided'
                    }\n\n__**Giveaway Winners**__\nNot Decided.`
                )
                .setFooter(client.user.tag, client.user.avatarURL())
                .setColor('#000')
                .setTimestamp(new Date().getTime() + ms(duration))

            message.delete()
            let msg = await message.channel.send({ embeds: [embed] }).catch(err => {
                if (err.code === 50007) return
                console.log(err)
            })
            await msg.react('905853645780840459')

            const newGiveaway = new Giveaway({
                messageID: msg.id,
                channelID: message.channel.id,
                guildID: message.guild.id,
                startAt: start,
                endAt: end,
                ended: false,
                winnerCount: winnersCount,
                giveawayRole: giveawayForThisRole,
                prize: prize,
                hostedBy: message.author.id
            })

            newGiveaway.save({}, err => {
                if (err) return console.error(err)
                // console.log(newGiveaway)
            })
        } catch (err) {
            message.author.send('I dont have permissions to do anything').catch(err => {
                if (err.code === 50007) return
                console.log(err)
            })
        }
    }
}
