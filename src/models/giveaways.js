const mongoose = require('mongoose')

const giveawaySchema = new mongoose.Schema(
    {
        messageID: String,
        channelID: String,
        guildID: String,
        startAt: Number,
        endAt: Number,
        ended: Boolean,
        winnerCount: Number,
        giveawayRole: String,
        prize: String,
        hostedBy: String
    },
    { id: false }
)

module.exports = mongoose.model('giveaways', giveawaySchema)
