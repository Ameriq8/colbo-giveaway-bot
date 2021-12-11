const { Client, Intents } = require('discord.js')
const { connect } = require('mongoose')
const { registerCommands, registerEvents } = require('./utils/registry')
const config = require('../slappey.json')
const Giveaway = require('./models/giveaways')
require("dotenv").config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING
    ]
})

connect(config.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

(async () => {
    setInterval(() => {
        giveawayTime()
    }, 5000)
    client.commands = new Map()
    client.events = new Map()
    client.giveaways = new Array()
    client.prefix = config.prefix
    await registerCommands(client, '../commands')
    await registerEvents(client, '../events')
    await client.login(process.env.token)
})()

async function giveawayTime() {
    let giveaways = await Giveaway.find({ ended: false })
    //console.log(giveaways)
    giveaways.forEach(async g => {
        let giveaway = await Giveaway.findOne({ messageID: g.messageID })
        if (Date.now() >= g.endAt) {
            console.log(giveaway)
            giveaway.ended = true
            giveaway.save({}, async err => {
                if (err) return console.error(err)
            })
            client.emit('giveawayEnd', g)
        }

        let channel = client.channels.cache.get(giveaway.channelID)
        if (channel) {
            if (!channel.messages.fetch(giveaway.messageID)) {
                console.log("giveaway message wasn't found, removing the giveaway.")
                Giveaway.deleteOne({ messageID: giveaway.messageID })
            }
        }
    })
}
