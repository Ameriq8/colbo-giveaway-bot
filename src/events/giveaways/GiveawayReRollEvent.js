const BaseEvent = require('../../utils/structures/BaseEvent')
const { MessageEmbed } = require('discord.js')

module.exports = class GiveawayRERoll extends BaseEvent {
    constructor() {
        super('giveawayReRoll')
    }

    async run(client, giveaway) {
        try {
            if (client.giveaways.includes(giveaway.messageID)) {
                client.giveaways.splice(client.giveaways.indexOf(giveaway.messageID), 1)
            }

            let message = await client.channels.cache.get(giveaway.channelID).messages.fetch(giveaway.messageID)
            let all = await message.reactions.cache.get('905853645780840459').users.fetch()
            let users = all.filter(u => !u.bot)
            let user = randomUsers(users, giveaway.winnerCount)

            let cache = []

            let messageURL = `https://discord.com/channels/${giveaway.guildID}/${giveaway.channelID}/${giveaway.messageID}`

            user.forEach(u => {
                if (u == undefined) return
                let member = client.users.cache.get(u.id)
                member
                    ? member
                          .send({
                              embeds: [
                                  {
                                      description: `Congratulations, ${member}! You won **${giveaway.prize}**!\n[Message](${messageURL})`,
                                      color: 'WHITE'
                                  }
                              ]
                          })
                          .catch(err => {
                              if (err.code === 50007) return
                              console.log(err)
                          })
                    : console.log('User not found')
                cache.push(member)
            })

            let embed = new MessageEmbed()
                .setTitle(`:gift: ReRoll ${giveaway.prize}`)
                .setDescription(
                    `React with <:react:905853645780840459> to participate\n__**Information**__\n<:dot:905834850253152337> Winner(s): ${
                        giveaway.winnerCount
                    }\n<:dot:905834850253152337> Hosted by: <@${
                        giveaway.hostedBy
                    }>\n\n__**Giveaway For**__\n${
                        giveaway.giveawayRole ? giveaway.giveawayRole : 'Not Decided'
                    }\n\n__**Giveaway Winners**__\n${
                        cache.length >= 1 ? cache.map(us => `<:dot:905834850253152337> ${us}`).join('\n') : 'Not Decided.'
                    }`
                )
                .setFooter(client.user.tag, client.user.avatarURL())
                .setColor('#000')
                .setTimestamp()

            let cc = client.channels.cache.get(giveaway.channelID)
            cc.send({
                content: `Congratulations, for the winners: ${cache.length >= 1 ? cache.map(us => us) : 'Not Decided.'}! You won **${
                    giveaway.prize
                }**!`,
                embeds: [{ description: `${cache.length} entrants [↗](${messageURL})` }]
            }).catch(err => {
                if (err.code === 50007) return
                console.log(err)
            })

            return message.edit({ embeds: [embed] })
        } catch (err) {
            console.error(err)
        }
    }
}

const randomUsers = (users, amount = 1) => {
    let array = []
    let myArray = []
    while (amount > 0) {
        const getRandomItem = iterable => iterable.get([...iterable.keys()][Math.floor(Math.random() * iterable.size)])
        array = [...array, getRandomItem(users)]
        amount--
    }

    array.forEach(c => {
        if (!myArray.includes(c)) {
            myArray.push(c)
        }
    })

    return myArray
}
